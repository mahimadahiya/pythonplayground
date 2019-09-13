/*
 * Generated by util/mkerr.pl DO NOT EDIT
 * Copyright 1995-2018 The OpenSSL Project Authors. All Rights Reserved.
 *
 * Licensed under the OpenSSL license (the "License").  You may not use
 * this file except in compliance with the License.  You can obtain a copy
 * in the file LICENSE in the source distribution or at
 * https://www.openssl.org/source/license.html
 */

#ifndef HEADER_OCSPERR_H
# define HEADER_OCSPERR_H

# include <openssl/opensslconf.h>

# ifndef OPENSSL_NO_OCSP

#  ifdef  __cplusplus
extern "C"
#  endif
int ERR_load_OCSP_strings(void);

/*
 * OCSP function codes.
 */
#  define OCSP_F_D2I_OCSP_NONCE                            102
#  define OCSP_F_OCSP_BASIC_ADD1_STATUS                    103
#  define OCSP_F_OCSP_BASIC_SIGN                           104
#  define OCSP_F_OCSP_BASIC_SIGN_CTX                       119
#  define OCSP_F_OCSP_BASIC_VERIFY                         105
#  define OCSP_F_OCSP_CERT_ID_NEW                          101
#  define OCSP_F_OCSP_CHECK_DELEGATED                      106
#  define OCSP_F_OCSP_CHECK_IDS                            107
#  define OCSP_F_OCSP_CHECK_ISSUER                         108
#  define OCSP_F_OCSP_CHECK_VALIDITY                       115
#  define OCSP_F_OCSP_MATCH_ISSUERID                       109
#  define OCSP_F_OCSP_PARSE_URL                            114
#  define OCSP_F_OCSP_REQUEST_SIGN                         110
#  define OCSP_F_OCSP_REQUEST_VERIFY                       116
#  define OCSP_F_OCSP_RESPONSE_GET1_BASIC                  111
#  define OCSP_F_PARSE_HTTP_LINE1                          118

/*
 * OCSP reason codes.
 */
#  define OCSP_R_CERTIFICATE_VERIFY_ERROR                  101
#  define OCSP_R_DIGEST_ERR                                102
#  define OCSP_R_ERROR_IN_NEXTUPDATE_FIELD                 122
#  define OCSP_R_ERROR_IN_THISUPDATE_FIELD                 123
#  define OCSP_R_ERROR_PARSING_URL                         121
#  define OCSP_R_MISSING_OCSPSIGNING_USAGE                 103
#  define OCSP_R_NEXTUPDATE_BEFORE_THISUPDATE              124
#  define OCSP_R_NOT_BASIC_RESPONSE                        104
#  define OCSP_R_NO_CERTIFICATES_IN_CHAIN                  105
#  define OCSP_R_NO_RESPONSE_DATA                          108
#  define OCSP_R_NO_REVOKED_TIME                           109
#  define OCSP_R_NO_SIGNER_KEY                             130
#  define OCSP_R_PRIVATE_KEY_DOES_NOT_MATCH_CERTIFICATE    110
#  define OCSP_R_REQUEST_NOT_SIGNED                        128
#  define OCSP_R_RESPONSE_CONTAINS_NO_REVOCATION_DATA      111
#  define OCSP_R_ROOT_CA_NOT_TRUSTED                       112
#  define OCSP_R_SERVER_RESPONSE_ERROR                     114
#  define OCSP_R_SERVER_RESPONSE_PARSE_ERROR               115
#  define OCSP_R_SIGNATURE_FAILURE                         117
#  define OCSP_R_SIGNER_CERTIFICATE_NOT_FOUND              118
#  define OCSP_R_STATUS_EXPIRED                            125
#  define OCSP_R_STATUS_NOT_YET_VALID                      126
#  define OCSP_R_STATUS_TOO_OLD                            127
#  define OCSP_R_UNKNOWN_MESSAGE_DIGEST                    119
#  define OCSP_R_UNKNOWN_NID                               120
#  define OCSP_R_UNSUPPORTED_REQUESTORNAME_TYPE            129

# endif
#endif
