<template>
    <!-- 输入框容器 -->
    <div class="text-group">
        <div class="input-group" :class="{'is-invalid':error}">
            <input
                :type="type"
                :placeholder="placeholder"
                :value="value"
                @input="$emit('input', $event.target.value)"
            >
            <button v-if="btnTitle" :disabled="disabled" @click="$emit('btnClick')">{{btnTitle}}</button>
        </div>
        <!-- 错误提示 -->
        <div v-if="error" class="error-note">{{error}}</div>        
    </div>
</template>
<script>
export default {
  name: "InputGroup",
  props: {
    type: {
      type: String,
      default: "text"
    },
    placeholder: String,
    value: String,
    btnTitle: String,
    disabled: Boolean,
    error: String
  }
};
</script>

<style lang="stylus">
    .input-group{
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 10px 0;
        margin-top: 15px;
        display: flex;
        justify-content: space-between;
    }
    .input-group input{
        width: 60%;
    }
    .input-group button{
        border: none;
        background-color: #fff;
    }
    .input-group button[disabled]{
        color: #aaa;
    }
    .is-invalid{
        border: 1px solid #f00;
    }
    .error-note{
        color: #f00;
    }
</style>