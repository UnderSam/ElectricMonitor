<template>
    <div :id="'echart'+index" style="width: 100vw; height: calc(100vh - 161px);"></div>
</template>


<script>

export default{
    props: [
        'index',
        'data',
        'date',
        'tab_name'
    ],
    mounted(){
        this.drawChart()
    },
    methods: {
        drawChart(){
            var chart = document.getElementById("echart" + this.index);
            chart.style.height = "calc(100vh - 121px);";
            let myChart = this.$echarts.init(document.getElementById("echart"+this.index));
            let option = {
                tooltip: {
                    trigger: 'axis',
                    position: function(pt){
                        return [pt[0], '10%'];
                    }
                },
                title: {
                    left: 'center',
                    text: '歷史資料'
                },
                toolbox: {
                    show: true,
                    orient: 'horizontal',
                    right: '10%',
                    showTitle: true,
                    feature: {
                        saveAsImage: {
                            show: true,
                            title: '保存為圖片',
                            type: 'jpeg',

                        }
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: this.date
                },
                yAxis: {
                    type: 'value',
                    boundaryGap: [0,'20%']
                },
                dataZoom: [{
                    type: 'inside',
                    start: 0,
                    end:10
                },{
                    start:0,
                    end:10,
                    handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                    handleSize: '80%',
                    handleStyle: {
                        color: '#fff',
                        shadowBlur: 3,
                        shadowColor: 'rgba(0,0,0,0.6)',
                        shadowOffsetX: 2,
                        shadowOffsetY: 2
                    }
                }],
                series: [
                    {
                        name: this.tab_name,
                        type: 'line',
                        smooth: false,
                        symbol: 'none',
                        sampling: 'average',
                        itemStyle: {
                            color: 'rgb(255,70,131)'
                        },
                        areaStyle: {
                            color:new this.$echarts.graphic.LinearGradient(0,0,0,1, [{
                                offset: 0,
                                color: 'rgb(255,158,68)'
                            }, {
                                offset: 1,
                                color: 'rgb(255,70,131)'
                            }])
                        },
                        data: this.data
                    }
                ]
            }
            myChart.setOption(option);
            window.addEventListener('resize', () => {
                myChart.resize();
            })
        }
    }
}

</script>