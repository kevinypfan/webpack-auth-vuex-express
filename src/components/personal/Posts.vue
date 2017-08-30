<template lang="html">
  <div class="post_contain">
    <div class="user">
      <div class="userImg" :style="{'background-image':' url('+post.userImg+')'}"></div>
      <div class="userName"> {{post.userNickname}}
        <p>{{timeStamp}}</p>
      </div>
    </div>
    <div class="post">
      <div class="postTitle">{{post.postTitle}}</div>
      <div class="postImg" :style="{'background-image':' url('+post.postImg+')'}"></div>
    </div>
    <div class="messages" v-for="m in post.messages">
      <div class="msgImg" :style="{'background-image':' url('+m.userImg+')'}"></div>
      <div class="message">
        <div class="msgName">{{m.userNickname}}
          <p>{{m._sendDate}}</p>
        </div>
        <div class="msg">{{m.message}}</div>
      </div>
    </div>
    <app-send-msg :post="post"></app-send-msg>
  </div>

</template>

<script>
import SendMsg from './SendMsg.vue'
export default {
  props: ['post'],
  computed: {
    timeStamp () {
      var date = new Date(this.post._creatDate)
      var time = moment(date).format('M月D日 H: mm');
      return time
    }
  },
  components: {
    appSendMsg: SendMsg
  },
  mounted () {
    this.post.messages.map((m) => {
      var date = new Date(m._sendDate)
      m._sendDate = moment(date).format('M月D日 H: mm');
      return m
    })
  }
}
</script>

<style lang="css" scoped>

body, html {
  margin: 0;
}

.post_contain {
  border-bottom: 1px solid #eee;
  padding: 10px 0;
}
.post_contain .user {
  margin: 10px 0;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}
.post_contain .user .userImg {
  height: 45px;
  width: 45px;
  border-radius: 50%;
  /*background-image: url(https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-9/20140031_1519698221448757_7578386114127055667_n.jpg?oh=5e4f4a51edc6a163a25f32e96b7a7a54&oe=5A28B28C);*/
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
  background-color: #eee;
}
.post_contain .user .userName {
  margin-left: 18px;
  font-size: 16px;
}
.post_contain .user .userName p {
  font-size: 12px;
  margin: 0;
  color: #888;
}
.post_contain .post .postTitle {
  margin-bottom: 5px;
  word-break: break-all;
}
.post_contain .post .postImg {
  height: 50vh;
  /*background-image: url(https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-9/21077399_743841919140778_8763221857827145919_n.jpg?oh=9a387df848c0b15a1ea43d371a071008&oe=5A29DC73);*/
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
  background-color: #eee;
}
.post_contain .messages {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  margin-top: 5px;
}
.post_contain .messages .msgImg {
  height: 45px;
  width: 45px;
  padding: 0px 20px;
  border-radius: 10px;
  /*background-image: url(https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-9/20140031_1519698221448757_7578386114127055667_n.jpg?oh=5e4f4a51edc6a163a25f32e96b7a7a54&oe=5A28B28C);*/
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
  background-color: #eee;
}
.post_contain .messages .message {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}
.post_contain .messages .message .msgName {
  margin: 0 10px;
}
.post_contain .messages .message .msgName p {
  font-size: 12px;
  margin: 0;
  color: #888;
  margin-top: 3px;
}
.post_contain .messages .message .msg {
  word-break: break-all;
  font-size: 14px;
  color: #555;
}

</style>
