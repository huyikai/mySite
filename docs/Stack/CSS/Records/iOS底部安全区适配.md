# iOS 底部安全区适配

- **问题：** iOS 全面屏设备的屏幕底部有黑色横条显示，会对 UI 造成遮挡，影响事件点击和视觉效果。Android 没有横条，不受影响。
- **场景：** 各页面底部悬浮菜单、相对于底部距离固定的悬浮按钮、长列表的最后一个内容。
- **解决方案：**

  - 使用 css 样式 `constant(safe-area-inset-bottom)` `env(safe-area-inset-bottom)` 来处理，兼容 iOS11.2+，根据 [iOS 系统版本占比](https://developer.apple.com/support/app-store/)，可放心使用。需注意该方法小程序模拟器不支持，真机正常。

```css
/* 底部悬浮固定的菜单或其他容器 */
padding-bottom: calc(0px + constant(safe-area-inset-bottom));
padding-bottom: calc(0px + env(safe-area-inset-bottom));
/* 相对于底部固定的悬浮元素，如返回顶部 */
position: fixed;
bottom: calc(0px + constant(safe-area-inset-bottom));
bottom: calc(0px + env(safe-area-inset-bottom));
```
