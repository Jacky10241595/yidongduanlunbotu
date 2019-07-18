/**
 * @author 谁写的 联系方式
 * @date 写这个代码的时间
 * @description 功能是什么 - 封装好的移动端的单击操作
 * @param { 类型 - element } element 
 * @param {number} span 按下的时间间隔
 * @param {number} offset 允许的位置偏差
 * @param {function} callback 回调函数
 */

function tap(element, callback, span, offset) {
    span = span || 200;
    offset = offset || 50;
    // 定义变量,记录开始时间
    let startTime = 0;
    //定义变量,记录开始位置
    let startX = 0;
    let startY = 0;
    //注册触摸开始事件
    element.addEventListener('touchstart', function (e) {
        // 判断是否是单指操作
        if (e.touches.length !== 1) {
            console.log('这不是单指操作');
            return;
        }
        // 记录开始时间
        startTime = Date.now();
        //记录开始位置
        startX = e.touches[0].pageX;
        startY = e.touches[0].pageY;
    });

    // 注册结束事件
    element.addEventListener('touchend', function (e) {
        // 判断是否单指
        if (e.changedTouches.length !== 1) {
            console.log('不是单指');
            return;
        }
        // 记录结束时间
        let endTime = Date.now();
        // 计算开始与结束的时间差,再判断
        if (endTime - startTime > span) {
            console.log('按太久');
            return;
        }
        // 记录结束位置
        let endX = e.changedTouches[0].pageX;
        let endY = e.changedTouches[0].pageY;
        // 算出偏差,绝对值
        if (Math.abs(startX - endX) > offset || Math.abs(startY - endY) > offset) {
            console.log('位置偏差太大');
            return;
        }
        // 如果上面的条件都不成立，就是单击操作
        console.log('这是单击操作');
        // 如果已经是一个单击操作了，需要做一些对应的响应 - 如果是封装好的代码里面，需要让别人能做一些什么事情，就让把一个函数传递归来
        callback&&callback();
    })
}