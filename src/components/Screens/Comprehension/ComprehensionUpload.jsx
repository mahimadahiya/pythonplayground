import React from "react";
import { convertToRaw, convertFromRaw } from "draft-js";
import { convertFromHTML, convertToHTML } from "draft-convert";
import { DraftailEditor, ENTITY_TYPE, BLOCK_TYPE } from "draftail";
import "draft-js/dist/Draft.css";
import "draftail/dist/draftail.css";

const exporterConfig = {
  blockToHTML: block => {
    if (block.type === BLOCK_TYPE.BLOCKQUOTE) {
      return <blockquote />;
    }

    // Discard atomic blocks, as they get converted based on their entity.
    if (block.type === BLOCK_TYPE.ATOMIC) {
      return {
        start: "",
        end: ""
      };
    }

    return null;
  },

  entityToHTML: (entity, originalText) => {
    if (entity.type === ENTITY_TYPE.LINK) {
      return <a href={entity.data.url}>{originalText}</a>;
    }

    if (entity.type === ENTITY_TYPE.IMAGE) {
      return <img src={entity.data.src} alt={entity.data.alt} />;
    }

    if (entity.type === ENTITY_TYPE.HORIZONTAL_RULE) {
      return <hr />;
    }

    return originalText;
  }
};

const toHTML = raw =>
  raw ? convertToHTML(exporterConfig)(convertFromRaw(raw)) : "";

const editor = (
  <DraftailEditor
    onSave={raw => {
      console.log(toHTML(raw));
    }}
    enableHorizontalRule
    entityTypes={[
      {
        // We use the same value for type as in the converter.
        type: ENTITY_TYPE.LINK,
        // source: LinkSource,
        // decorator: Link,
        // We define what data the LINKs can have.
        attributes: ["url"],
        whitelist: {
          href: "^(?![#/])"
        }
      }
    ]}
  />
);

export default () => {
  return editor;
};
