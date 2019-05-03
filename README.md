# Visualization Assignment 3

---

##### Webpage:

https://liuxiangyuan.github.io/Visualization-Assignment3/

##### Data:

- MonthlyER.csv
  包含每月有效降水量
- MonthlyViz.csv
  包含每月在深浅观测井里所检测的降水量

##### Interactive tool:

- Brushing

##### Information can be obtained :

- 可以通过设定窗口的大小和滑动窗口来查看某一段时间的检测的降水量的趋势和有效降水量
- 可以得到有效降水量和检测量之间的关系
- 通过滑动窗口可以得到窗口内数据中月份与观测的降水量之间的回归方程，从而可以对后继的月份进行预测

##### How to choose  particular visual encodings and interaction techniques :

较该降水量的数据，数据的特征并不多，主要关系就是时间和降水量变化的关系，因此最简单的图例就是折线图和柱状图，因为该数据包含了有效降水量和观测降水量两个数据，因此可以用柱状图表示有效降水量，用折线图展示观测降水量随时间的变化趋势。此外，降水量的趋势通常与时间（季节）有关，所以可以使用Brush工具，截取一段时间内的数据进行观察，并绘制出回归线进行预测。

##### Alternatives and the ultimate choice:

###### Alternatives:

- Brushing
- Parallel

###### ultimate choice:

-> Brushing

考虑到该数据的维度较低，主要关系是降水量、观测量和时间的关系，因此用Parallel的话会有点小题大做甚至是偏离主题，虽然说Parallel也能够对一段时间内的数据进行展示，但整体上不能很好的给观看者传递有效的信息，并且时间点较多，数据上可能会较为密集。再者，降水量通常最有效的信息是其随时间的趋势，因此人们通常是观测某段时间内的降水量进行预测，所以用Brush就能够很好的对某时间段内的数据进行观测。

##### overview of development process：

首先是寻找数据。因为自己对前端、D3等并不熟悉，因此在找数据的适合避免了较为复杂的数据，索性就抓了一个降水量的数据，较为直观，且自己对这个数据内特征间的关系也较为熟悉。然后就是考虑怎么将数据可视化。因为实验要求需要有交互操作，在考虑Parallel和Brushing后，为更好的展示降水量、观测量在某段时间上与时间的关系，因此选择了Brushing。最后就是找例子学习Brushing，从而完成最后要完成的作品。总的来说，过程并不是很顺利。。。

其实一开始打算弄点有趣的数据可视化，因此花了一些时间在寻找一些有趣的数据上，但最后迫于自己的水平不够，没有做出来而选择了较为简单的数据进行可视化。花的较多的时间是在学习D3和编码上，大概花了一周的时间。。。T^T(对前端一窍不通)
