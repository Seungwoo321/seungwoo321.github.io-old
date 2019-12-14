
const md = require('markdown-it')();
const striptags = require('./strip-tags');
const hljs = require('highlight.js');
module.exports = (options, context) => ({
    name: 'vuepress-plugin-demo-block',
    chainMarkdown(config) {
        config
            .options
            .linkify(true)
            .typographer(true)
            .langPrefix('language-')
            .html(true)
            .highlight((str, lang) => {
                if (lang && hljs.getLanguage(lang)) {
                    try {
                        return '<pre class="hljs"><code class="' + lang + '">' +
                            hljs.highlight(lang, str, true).value +
                            '</code></pre>'
                    } catch (__) { }
                }
                return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>'
            })
    },
    extendMarkdown(md) {
        md.use(require('markdown-it-container'), 'demo', {
            validate: (params) => {
                return params.trim().match(/^demo\s*(.*)$/);
            },
            render: (tokens, idx) => {
                var m = tokens[idx].info.trim().match(/^demo\s*(.*)$/);
                if (tokens[idx].nesting === 1) {
                    var content = tokens[idx + 1].content
                    var html = convert(striptags.strip(content, ['script', 'style'])).replace(/(<[^>]*)=""(?=.*>)/g, '$1');
                    return `<demo-block>
                                <div slot="source">${html}</div>
                                <div class="hightlight" slot="hightlight">`
                }
                return `</div></demo-block>\n`
            }
        })
    }
})

function convert(str) {
    str = str.replace(/(&#x)(\w{4});/gi, function ($0) {
        return String.fromCharCode(
            parseInt(
                encodeURIComponent($0).replace(/(%26%23x)(\w{4})(%3B)/g, '$2'),
                16
            )
        );
    });
    return str;
}