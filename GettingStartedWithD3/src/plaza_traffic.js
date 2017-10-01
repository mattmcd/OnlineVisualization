var pt_vis;

pt_vis = (function () {
    function draw_div(data) {
        var sel = d3.select('body')
            .append('div')
            .attr('class', 'chart')
            .selectAll('bar')
            .data(data['cash'])
            .enter();

        draw_div_bar(sel);
    }

    function label_div(sel){
        console.log('labeling div');
        sel.append('div')
            .attr('class', 'label')
            .text(function (d) {
                return d.name
            })
    }

    function draw_div_bar(sel){
        console.log('drawing div bar');
        sel.append('div')
            .attr('class', 'bar')
            .style('width', function (d) {
                return d.count/100 + 'px';
            })
            //.style('outline', '1pt solid black')
            .text(function (d) {
                return Math.round(d.count)
            })
    }

    function draw_labeled_div(data) {
        d3.select('body')
            .append('div')
            .attr('class', 'chart')
            .selectAll('div.line')
            .data(data['cash'])
            .enter()
            .append('div')
            .attr('class', 'line');

        label_div(d3.selectAll('div.line'));
        draw_div_bar(d3.selectAll('div.line'));
    }

    return {
        'draw_div': draw_div,
        'draw_labeled_div': draw_labeled_div
    };
})();