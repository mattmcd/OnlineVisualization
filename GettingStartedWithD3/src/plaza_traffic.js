var pt_vis;

pt_vis = (function () {
    function draw_div(data) {
        d3.select('body')
            .append('div')
            .attr('class', 'chart')
            .selectAll('bar')
            .data(data['cash'])
            .enter()
            .append('div')
            .attr('class', 'bar')
            .style('width', function (d) {
                return d.count/100 + 'px';
            })
            .style('outline', '1pt solid black')
            .text(function (d) {
                return Math.round(d.count)
            })
    }

    return {
        'draw_div': draw_div
    };
})();