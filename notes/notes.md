一. 首页，登录和注册页

1. 配置less
2. element-ui 自行选择配置， 为啥export default ()=>{Vue.use(ElementUI)}也行
3. nuxt中a标签保持样式  .nuxt-link-exact-active
4. 回车<br>
5. 搜索框的选择，input的placeholder跟着改变
6. 梯形：
  transform-origin: bottom left;
  transform: scale(1.1,1.3) perspective(0.7em) rotateX(2.2deg);
7. element-UI的form验证自定义规则，写在data里面，return之前， 并且定义的函数只能用箭头函数，否则this不对
   用箭头的时候this只想xue实例， 用function的时候this指向一个对象：



![image-20191030094117825](./media/this-of-validator.png)

8. 解构赋值： 

   ```js
   let { password2, ...data } = this.registerForm
   ```

     获得registerForm中除了password2以外的数据，存于data对象中



 9. 服务器返回400，很可能是数据格式出现问题，要么是data，要么是header（content-type）

    nuxt.js中的axios用法：

    ```js
    this.$axios.post('/accounts/register', data)
    ```

    其中data为数据对象

    ![image-20191030151959901](./media/axios-methods-aliases.png)



10. 因为是服务器端渲染，无法直接使用localStorage进行本地存储

    可以通this.$store中的vuex的actions,其中值得注意的是：

![image-20191030161537414](./media/nuxt-vuex-actions.png)

而vuex中的actions表明：

![vuex-actions](./media/vuex-actions.png)

[Promise相关知识]( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise )

=============================================

如果在组件内部已经使用axios的promise，可以不用actions, 而使用mutations和commit来实现本地存储

问题就是要知道，store可以与客户端进行联系



11. header怎么知道现在是login还是没有login？通过store里面存储的信息，以及本地存储的信息来判断，当需要复杂的组件件数据的传递时，应立刻想到用vuex（store)



二. 国内机票页

 1. 令img变为块级元素可以去除下方的margin

    ```css
    img{
        display: block;
    }
    ```

2. 