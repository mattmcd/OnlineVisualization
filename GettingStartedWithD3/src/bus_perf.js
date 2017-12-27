define(['d3'], function (d3) {
    var margin = 50;
    var width = 700;
    var height = 300;
    var svg = 'svg';

    function get_scale(data) {
        var x_extent = d3.extent(data, function (d) {
            return d['collision_with_injury']
        });
        var x_scale = d3.scaleLinear().domain(x_extent).range([margin, width - margin]);

        var y_extent = d3.extent(data, function (d) {
            return d['dist_between_fail']
        });
        var y_scale = d3.scaleLinear().domain(y_extent).range([height - margin, margin]);

        return {'x': x_scale, 'y': y_scale};
    }

    function scale_circle(scale) {
        d3.selectAll('circle')
            .attr('cx', function (d) {
                return scale.x(d['collision_with_injury'])
            })
            .attr('cy', function (d) {
                return scale.y(d['dist_between_fail'])
            })
            .attr('r', 5);
    }

    function add_x_axis(scale) {
        var x_axis = d3.axisBottom(scale.x);
        d3.select(svg)
            .append('g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0,'+ (height-margin) + ')')
            .call(x_axis);
    }

    function add_y_axis(scale) {
        var y_axis = d3.axisLeft(scale.y);
        d3.select(svg)
            .append('g')
            .attr('class', 'y axis')
            .attr('transform', 'translate(' + margin + ',0)')
            .call(y_axis);
    }

    function draw(data, root) {
        root = typeof root !== 'undefined' ? root : 'body';
        if (root !== 'body') {
            svg = root + ' svg';
        }
        console.log('Entering draw, root element is ' + root);
        d3.select(root)
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .selectAll('circle')
            .data(data)
            .enter()
            .append('circle');

        var scale = get_scale(data);
        scale_circle(scale);
        add_x_axis(scale);
        add_y_axis(scale);

        // Axis labels
        d3.select('.y.axis')
            .append('text')
            .text('mean distance between failure (miles)')
            .attr('transform', "rotate (-90, -43, 0) translate(-280)");

        d3.select('.x.axis')
            .append('text')
            .text('collisions with injury (per million miles)')
            .attr('x', function(){return (width / 2) - margin})
            .attr('y', margin/1.5);
    }

    return {
        'draw': draw
    }

});