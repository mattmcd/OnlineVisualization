function draw(data) {
    "use strict";

    function list_service_status() {
        d3.select('body')
            .append('ul')
            .selectAll('li')
            .data(data)
            .enter()
            .append('li')
            .text(
                function (d) {
                    return d.name + ': ' + d.status;
                }
            );
    }

    list_service_status();

    function bold_issues() {
        d3.selectAll('li')
            .style('font-weight', function (d) {
                if (d.status[0] === "GOOD SERVICE") {
                    return 'normal';
                } else {
                    return 'bold';
                }
            });
    }

    bold_issues();
}