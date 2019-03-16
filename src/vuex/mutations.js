// 提交 mutations是更改Vuex状态的唯一合法方法
export const modifyAddress = (state, name) => { // A组件点击更改餐馆名称为 A地址
    state.address = name; // 把方法传递过来的参数，赋值给state中的resturantName
}
export const modifyBName = (state, name) => { // B组件点击更改餐馆名称为 B地址
    state.address = name;
}