const lcore = new (require('./index.js'));

lcore.addModule({
	namespace: '@lcp:',
	name: 'LangCorePackage Syntax',
	do: {
		'global': '""',
		'{': 'const synpkg = {',
		'end': '}};synpkg.namespace=synpkg.prefix;synpkg.regex=synpkg.useRegex;module.exports = synpkg;',
		'definitions': 'do: {',
	}
})

lcore._core.QUIET = true;
const compilePackage = (packageName) => {
	const lines = lcore.interpretFile(packageName);
	return {
		eval: eval(lines),
		raw: lines
	}
}

module.exports = compilePackage;