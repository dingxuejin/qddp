
window.tokenStr = 'token'
$(function () {
  window.tokenStr = getToken()
})

/**
 * getToken
 */
function getToken () {
  var resultkey = null
  try { // 解决SESSION超时后自动跳转登录页面的问题
    $.ajax({
      type: 'POST',
      url: '/dyfxyj/fxyj_index/rest/main/getToken',
      async: false,
      dataType: 'json',
      success: function (result) {
        resultkey = result.resultValue.items[0].token
      },
      error: function () {
        resultkey = 'token'
      }
    })
  } catch (e) {
    resultkey = 'token'
  }
  return resultkey
}
