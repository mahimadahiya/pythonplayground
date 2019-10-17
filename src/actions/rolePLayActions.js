import adminPanelApi from "../apis/adminPanel";



export const rolePlayList = async authToken => {
    const response = await adminPanelApi(authToken).get(
      "/v1/admin/rp/article/list"
    );
        return response.data.result;
  };

  export const addRolePlay = async (authToken, formValues) => {
    let response = null;

    let formData = new FormData();
    formData.append("name",formValues.name)
    formData.append("left_avatar", formValues.leftAvatarImage)
    formData.append("left_avatar_name", formValues.leftAvatarName )
    formData.append("right_avatar_name", formValues.rightAvatarName )
    formData.append("right_avatar", formValues.rightAvatarImage )
    formData.append("background_file", formValues.backImage )
    formData.append("description", formValues.description )
    formData.append("post_description", formValues.postDescription )
    response = await adminPanelApi(authToken).post(
        "/v1/admin/rp/article/create/",
        formData
      );
      return response;
  };

  export const rolePlayConversationDetails = async (authToken,id) => {
    const response = await  adminPanelApi(authToken).get(
      '/v1/admin/rp/article/conversation/list',{
        params:{
          rp_article_id:id
        }
      }    );
    //console.log(response);
    return response.data;
  };

  export const addConversation = async (authToken,formValues) => {
      let response = null;
      let formData = new FormData();
      
      formData.append("text",formValues.text)
      formData.append("conversation_type",formValues.conversation_type)
      formData.append("rp_article_id",formValues.rp_article_id)
      formData.append("timer",formValues.timer)
      formData.append("title",formValues.title)
      response = await adminPanelApi(authToken).post(
       "/v1/admin/rp/article/conversation/create/",
         formData
      );
    return response;
  }