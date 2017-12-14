/**
 * Create wrapper strings.
 * @param {object} manifest
 * @param {string} manifest.name - module name
 * @param {string} manifest.version - Merged into standard header and footer.
 * @param {boolean} [manifest.isJSON] - If truthy, wraps contents in `module.exports=` and `;`.
 * @param {string} [manifest.header] - Custom header (typically paired with a custom footer).
 * @param {string} [manifest.footer] - Custom footer (typically paired with a custom header).
 * @constructor
 */
function Wrapper(manifest) {

    var header = manifest.header ||
        '(function(require, module, exports) { // ${name}@${version}\n\n' +
        (manifest.isJSON ? 'module.exports = ' : '');

    var footer = manifest.footer ||
        (manifest.isJSON ? ';' : '') +
        '\n\n})(fin.Hypergrid.require, fin.Hypergrid.modules, fin.Hypergrid.modules.exports = {});\n' +
        'fin.Hypergrid.modules.exports.\$\$VERSION = \'${version}\';\n' +
        'fin.Hypergrid.modules[\'${name}\'] = fin.Hypergrid.modules.exports;\n' +
        'delete fin.Hypergrid.modules.exports;\n\n';

    this.header = merge(header);
    this.footer = merge(footer);

    function merge(s) {
        return s.replace(/\$\{(\w+)\}/g, function(match, p1) {
            if (!(p1 in manifest)) {
                throw new Error('Expected manifest.' + p1 +' to be defined.');
            }
            return manifest[p1];
        });
    }
}


Wrapper.prototype.wrap = function(code) {
    return this.header + code + this.footer;
};


module.exports = Wrapper;
