require.config(
    {
        paths: {d3: 'lib/d3', bp_vis: 'src/bus_perf'}
    }
);

requirejs(['d3', 'bp_vis'],
    function(d3, bp_vis){
        var data_path = "data/bus_perf.json";
        d3.json(data_path, function (x) {bp_vis.draw(x, 'body');} );
    }
);