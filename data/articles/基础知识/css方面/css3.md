#### 1.渐变

##### 1.线性渐变

```
background-image: linear-gradient([direction], color-stop1, color-stop2, ...);
```

1. direction属性：

| 值                  | 含义             |
| ------------------- | ---------------- |
| ##                  | 从上到下         |
| to right            | 从左到右         |
| to bottom right     | 从左上角到右下角 |
| angle（-90-180deg） | 自定义角度       |

![img](https://www.runoob.com/wp-content/uploads/2014/07/7B0CC41A-86DC-4E1B-8A69-A410E6764B91.jpg)

2. 使用透明度

   ```css
   /*为了添加透明度，我们使用 rgba() 函数来定义颜色节点。rgba() 函数中的最后一个参数可以是从 0 到 1 的值，它定义了颜色的透明度：0 表示完全透明，1 表示完全不透明*/
   background-image: linear-gradient(to right, rgba(255,0,0,0), rgba(255,0,0,1));
   ```

3. 重复的线性渐变

   ```css
   background-image: repeating-linear-gradient(red, yellow 10%, green 20%);
   ```

##### 2.径向渐变

​		径向渐变由它的中心定义，为了创建一个径向渐变，必须至少定义两种颜色节点。颜色节点即想要呈现平稳过渡的颜色。同时，也可以指定渐变的中心、形状（圆形或椭圆形）、大小。默认情况下，渐变的中心是 center（表示在中心点），渐变的形状是 ellipse（表示椭圆形），渐变的大小是 farthest-corner（表示到最远的角落）。

```css
background-image: radial-gradient(shape size at position, start-color, ..., last-color);
```

1. 颜色不均匀分布的径向渐变

   ```
   background-image: radial-gradient(red 5%, yellow 15%, green 60%);
   ```

2. shape参数

   | 值           | 含义 |
   | ------------ | ---- |
   | ##（ellips） | 椭圆 |
   | circle       | 圆形 |

3. size参数

   | 值              | 含义 |
   | --------------- | ---- |
   | closest-side    |      |
   | closest-side    |      |
   | closest-side    |      |
   | farthest-corner |      |

4. 重复的径向渐变

   ```css
    background-image: repeating-radial-gradient(red, yellow 10%, green 15%);
   ```

#### 2.文本属性

| 属性                                                         | 描述                                                    | CSS  |
| :----------------------------------------------------------- | :------------------------------------------------------ | :--- |
| [hanging-punctuation](https://www.runoob.com/cssref/css3-pr-hanging-punctuation.html) | 规定标点字符是否位于线框之外。                          | 3    |
| [punctuation-trim](https://www.runoob.com/cssref/css3-pr-punctuation-trim.html) | 规定是否对标点字符进行修剪。                            | 3    |
| [text-align-last](https://www.runoob.com/cssref/css3-pr-text-align-last.html) | 设置如何对齐最后一行或紧挨着强制换行符之前的行。        | 3    |
| [text-emphasis](https://www.runoob.com/css3/css3-pr-text-emphasis.html) | 向元素的文本应用重点标记以及重点标记的前景色。          | 3    |
| [text-justify](https://www.runoob.com/cssref/css3-pr-text-justify.html) | 规定当 text-align 设置为 "justify" 时所使用的对齐方法。 | 3    |
| [text-outline](https://www.runoob.com/cssref/css3-pr-text-outline.html) | 规定文本的轮廓。                                        | 3    |
| [text-overflow](https://www.runoob.com/cssref/css3-pr-text-overflow.html) | 规定当文本溢出包含元素时发生的事情。                    | 3    |
| [text-shadow](https://www.runoob.com/cssref/css3-pr-text-shadow.html) | 向文本添加阴影。                                        | 3    |
| [text-wrap](https://www.runoob.com/cssref/css3-pr-text-wrap.html) | 规定文本的换行规则。                                    | 3    |
| [word-break](https://www.runoob.com/cssref/css3-pr-word-break.html) | 规定非中日韩文本的换行规则。                            | 3    |
| [word-wrap](https://www.runoob.com/cssref/css3-pr-word-wrap.html) | 允许对长的不可分割的单词进行分割并换行到下一行。        | 3    |

#### 3.字体

#### 4.2D转换

```css
transform: rotate(30deg);
```

| 函数                            | 描述                                     |
| :------------------------------ | :--------------------------------------- |
| matrix(*n*,*n*,*n*,*n*,*n*,*n*) | 定义 2D 转换，使用六个值的矩阵。         |
| translate(*x*,*y*)              | 定义 2D 转换，沿着 X 和 Y 轴移动元素。   |
| translateX(*n*)                 | 定义 2D 转换，沿着 X 轴移动元素。        |
| translateY(*n*)                 | 定义 2D 转换，沿着 Y 轴移动元素。        |
| scale(*x*,*y*)                  | 定义 2D 缩放转换，改变元素的宽度和高度。 |
| scaleX(*n*)                     | 定义 2D 缩放转换，改变元素的宽度。       |
| scaleY(*n*)                     | 定义 2D 缩放转换，改变元素的高度。       |
| rotate(*angle*)                 | 定义 2D 旋转，在参数中规定角度。         |
| skew(*x-angle*,*y-angle*)       | 定义 2D 倾斜转换，沿着 X 和 Y 轴。       |
| skewX(*angle*)                  | 定义 2D 倾斜转换，沿着 X 轴。            |
| skewY(*angle*)                  | 定义 2D 倾斜转换，沿着 Y 轴。            |

#### 5.3D转换

```css
transform: rotateX(120deg);
```

| 函数                                                         | 描述                                      |
| :----------------------------------------------------------- | :---------------------------------------- |
| matrix3d(*n*,*n*,*n*,*n*,*n*,*n*, *n*,*n*,*n*,*n*,*n*,*n*,*n*,*n*,*n*,*n*) | 定义 3D 转换，使用 16 个值的 4x4 矩阵。   |
| translate3d(*x*,*y*,*z*)                                     | 定义 3D 转化。                            |
| translateX(*x*)                                              | 定义 3D 转化，仅使用用于 X 轴的值。       |
| translateY(*y*)                                              | 定义 3D 转化，仅使用用于 Y 轴的值。       |
| translateZ(*z*)                                              | 定义 3D 转化，仅使用用于 Z 轴的值。       |
| scale3d(*x*,*y*,*z*)                                         | 定义 3D 缩放转换。                        |
| scaleX(*x*)                                                  | 定义 3D 缩放转换，通过给定一个 X 轴的值。 |
| scaleY(*y*)                                                  | 定义 3D 缩放转换，通过给定一个 Y 轴的值。 |
| scaleZ(*z*)                                                  | 定义 3D 缩放转换，通过给定一个 Z 轴的值。 |
| rotate3d(*x*,*y*,*z*,*angle*)                                | 定义 3D 旋转。                            |
| rotateX(*angle*)                                             | 定义沿 X 轴的 3D 旋转。                   |
| rotateY(*angle*)                                             | 定义沿 Y 轴的 3D 旋转。                   |
| rotateZ(*angle*)                                             | 定义沿 Z 轴的 3D 旋转。                   |
| perspective(*n*)                                             | 定义 3D 转换元素的透视视图。              |

#### 6.过渡

```css
/*当鼠标经过时触发过渡效果*/
div{
    transition: width 2s;
}
div:hover{
    width:300px;
}
```

| 属性                                                         | 描述                                         | CSS  |
| :----------------------------------------------------------- | :------------------------------------------- | :--- |
| [transition](https://www.runoob.com/cssref/css3-pr-transition.html) | 简写属性，用于在一个属性中设置四个过渡属性。 | 3    |
| [transition-property](https://www.runoob.com/cssref/css3-pr-transition-property.html) | 规定应用过渡的 CSS 属性的名称。              | 3    |
| [transition-duration](https://www.runoob.com/cssref/css3-pr-transition-duration.html) | 定义过渡效果花费的时间。默认是 0。           | 3    |
| [transition-timing-function](https://www.runoob.com/cssref/css3-pr-transition-timing-function.html) | 规定过渡效果的时间曲线。默认是 "ease"。      | 3    |
| [transition-delay](https://www.runoob.com/cssref/css3-pr-transition-delay.html) | 规定过渡效果何时开始。默认是 0。             |      |

#### 7.动画

```css
/*定义动画*/
@keyframes myfirst {
    from {background: red;}
    to {background: yellow;}
}
/*也可以写作*/
@keyframes myfirst
{
    0%   {background: red;}
    25%  {background: yellow;}
    50%  {background: blue;}
    100% {background: green;}
}

/*再组件中使用动画*/
div{
    animation: myfirst 5s;
}
```

| 属性                                                         | 描述                                                         | CSS  |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :--- |
| [@keyframes](https://www.runoob.com/cssref/css3-pr-animation-keyframes.html) | 规定动画。                                                   | 3    |
| [animation](https://www.runoob.com/cssref/css3-pr-animation.html) | 所有动画属性的简写属性。                                     | 3    |
| [animation-name](https://www.runoob.com/cssref/css3-pr-animation-name.html) | 规定 @keyframes 动画的名称。                                 | 3    |
| [animation-duration](https://www.runoob.com/cssref/css3-pr-animation-duration.html) | 规定动画完成一个周期所花费的秒或毫秒。默认是 0。             | 3    |
| [animation-timing-function](https://www.runoob.com/cssref/css3-pr-animation-timing-function.html) | 规定动画的速度曲线。默认是 "ease"。                          | 3    |
| [animation-fill-mode](https://www.runoob.com/cssref/css3-pr-animation-fill-mode.html) | 规定当动画不播放时（当动画完成时，或当动画有一个延迟未开始播放时），要应用到元素的样式。 | 3    |
| [animation-delay](https://www.runoob.com/cssref/css3-pr-animation-delay.html) | 规定动画何时开始。默认是 0。                                 | 3    |
| [animation-iteration-count](https://www.runoob.com/cssref/css3-pr-animation-iteration-count.html) | 规定动画被播放的次数。默认是 1。                             | 3    |
| [animation-direction](https://www.runoob.com/cssref/css3-pr-animation-direction.html) | 规定动画是否在下一周期逆向地播放。默认是 "normal"。          | 3    |
| [animation-play-state](https://www.runoob.com/cssref/css3-pr-animation-play-state.html) | 规定动画是否正在运行或暂停。默认是 "running"。               |      |