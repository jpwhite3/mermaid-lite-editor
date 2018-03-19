'use strict';

/**
 * @ngdoc function
 * @name LagoonApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the LagoonApp
 */
angular.module('LagoonApp')
.controller('MainCtrl', ['$scope', '$sce', '$location', 'base64', function($scope, $sce, $location, base64) {
    var absurl = window.location.href.split('#')[0];
    
    $scope.exampleSelect = '';
    $scope.exampleCode = 'graph LR\n' +
      'A((START)) --> B((END))';

    $scope.viewlink = '';
    $scope.editlink = '';
    $scope.svglink = '';
    $scope.showerror = false;
    $scope.showform = true;
    window.base64 = base64;

    $scope.checkUpdate = function() {
        $scope.viewlink = buildURL('view', $scope.mermaidsyntax);
        $scope.editlink = buildURL('edit', $scope.mermaidsyntax);
        setTimeout(function() {
            var syntax = $sce.trustAsHtml($scope.mermaidsyntax) + '\n';
            // Delete and re add the mermaid node from the DOM
            var mermaidholder = document.getElementById('mermaidholder');
            //Delete the exisiting child nodes
            while (mermaidholder.firstChild) {
                mermaidholder.removeChild(mermaidholder.firstChild);
            }

            if (mermaid.parse(syntax)) { //jshint ignore:line
                $scope.showerror = false;
                //Add the new node
                var mermaidnode = document.createElement('div');
                mermaidnode.className = 'mermaid';
                mermaidnode.appendChild(document.createTextNode($sce.trustAsHtml($scope.mermaidsyntax)));
                mermaidholder.appendChild(mermaidnode);
                mermaid.init(); // jshint ignore:line
                $scope.svglink = buildSVGURL();
            } else {
                $scope.showerror = true;
            }
            $scope.$apply();
        }, 1000);
    };

    $scope.$watch(function() { return $location.url(); }, route);

    function route() {
        var code;

        // ##uriEncodedDiagramString (for backwards compatibility)
        if ($location.hash()) {
            code = $location.hash();
            code = base64.urldecode(code.split('/')[2]);
            console.log(code);
            return viewDiagram(code);
        }

        // #/view/base64EncodedDiagramString
        if ($location.path().match(/^\/view\//)) {
            code = base64.urldecode($location.path().split('/')[2]);
            return viewDiagram(code);
        }

        return resetDiagram();
    }

    function viewDiagram(code) {
        $scope.mermaidsyntax = code;
        $scope.checkUpdate();
    }

    function editDiagram(code) {
        $scope.mermaidsyntax = code;
        document.getElementById('diagramCode').focus();
        $scope.checkUpdate();
    }

    function resetDiagram() {
        $scope.mermaidsyntax = $scope.exampleCode;
        document.getElementById('diagramCode').focus();
        $scope.checkUpdate();
    }

    function buildURL(action, code) {
        return absurl + '#/' + action + '/' + base64.urlencode(code);
    }

    function buildSVGURL() {
        var svg = document.querySelector('svg').outerHTML;
        return 'data:image/svg+xml;base64,' + base64.encode(svg);
    }

    $scope.$watch('exampleSelect', function (newValue, oldValue, scope) {
        if(newValue){
            var code = '';
            if(newValue == 'fc-t2b'){
                code = 'graph TB\n' +
                  'A[Hard edge] --Link text--> B(Round edge)\n' +
                  'B --> C{Decision}\n' +
                  'C -->|One| D[fa:fa-ban forbidden Result one]\n' +
                  'C -->|Two| E[Result two]\n' +
                  'E --> F((END))';
            }
            else if(newValue == 'fc-b2t'){
                code = 'graph BT\n' +
                  'A[Hard edge] -->|Link text| B(Round edge)\n' +
                  'B --> C{Decision}\n' +
                  'C -->|One| D[fa:fa-ban forbidden Result one]\n' +
                  'C -->|Two| E[Result two]\n' +
                  'E --> F((END))';
            }
            else if(newValue == 'fc-l2r'){
                code = 'graph LR\n' +
                  'A[Hard edge] -->|Link text| B(Round edge)\n' +
                  'B --> C{Decision}\n' +
                  'C -->|One| D[fa:fa-ban forbidden Result one]\n' +
                  'C -->|Two| E[Result two]\n' +
                  'E --> F((END))';
            }
            else if(newValue == 'fc-r2l'){
                code = 'graph RL\n' +
                  'A[Hard edge] -->|Link text| B(Round edge)\n' +
                  'B --> C{Decision}\n' +
                  'C -->|One| D[fa:fa-ban forbidden Result one]\n' +
                  'C -->|Two| E[Result two]\n' +
                  'E --> F((END))';
            }
            else if(newValue == 'sequence'){
                code = 'sequenceDiagram\n' +
                  'A->> B: Query\n' +
                  'B->> C: Forward query\n' +
                  'Note right of C: Thinking...\n' +
                  'C->> B: Response\n' +
                  'B->> A: Forward response\n';
            }
            else if(newValue == 'gantt'){
                code = 'gantt\n' +
                  'title A Gantt Diagram\n' +
                  'section Section\n' +
                  'A task           :a1, 2014-01-01, 30d\n' +
                  'Another task     :after a1  , 20d\n' +
                  'section Another\n' +
                  'Task in sec      :2014-01-12  , 12d\n' +
                  'anther task      : 24d';
            }
            viewDiagram(code);
        }
    });


}]);