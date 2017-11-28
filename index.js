/**
 * Created by joneit on 11/28/17.
 */

module.exports = function(name, version) {
    
    this.header = '// ' + name + '@' + version + '\n\n' +
            '(function(require, module, exports) {\n\n';

    this.footer = '\n\n' +
            '})(fin.Hypergrid.require, fin.Hypergrid.modules, fin.Hypergrid.modules.exports = {});\n\n' +
            'fin.Hypergrid.modules.exports.\$\$VERSION = \'' + version + '\';\n' +
            'fin.Hypergrid.modules[\'' + name + '\'] = fin.Hypergrid.modules.exports;\n' +
            'delete fin.Hypergrid.modules.exports;\n\n';

};
