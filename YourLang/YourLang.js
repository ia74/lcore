const file = 'main';
const extension = '.yl';
const sourceFolder = 'proj';
const showBuildProcess = false;



const lcoreClass = require('../src/index.js');
const lcore = new lcoreClass();
const fs = require('fs');
const path = require('path');
const compiler = require('../src/PackageCompiler.js');



let startBuildTime = Date.now();
let packageCount = 0;
if (showBuildProcess) console.group('(Build [1/4]) Hold on, compiling packages...');
lcore._core.QUIET = !showBuildProcess;

fs.readdirSync('./syntax_packages').forEach(file => {
	if (file.endsWith('.pkg')) {
		let cO = compiler(path.resolve(__dirname, './syntax_packages/' + file));
		let cMod = cO.eval;
		if (cMod.disabled) return;

		lcore.addModule(cMod);

		if (showBuildProcess) console.log('Compiled package ' + file.split('.pkg')[0] +' (' + cMod.name +')');
		
		if(!fs.existsSync('./syntax_packages/build')) fs.mkdirSync('./syntax_packages/build')
		fs.writeFileSync('./syntax_packages/build/' + file.split('.pkg')[0] + '.js', cO.raw);
		
		packageCount++;
	}
});

if (showBuildProcess) console.groupEnd();
if (showBuildProcess) console.log('(Build [2/4]) Compiled ' + packageCount + ' packages in ' + (Date.now() - startBuildTime) + 'ms');

let iT = Date.now();

const interpreted = lcore.interpretFile(require('path').resolve(__dirname, './' + sourceFolder + '/' + file + extension));

if (showBuildProcess) console.log('(Build [3/4]) ' + (Date.now() - startBuildTime) + 'ms to compile back to JS (Starting from package compilation), ' + (Date.now() - iT) + 'ms to run interpret astartBuildTimeion');

if (!fs.existsSync('./build')) fs.mkdirSync('./build');
fs.writeFileSync('./build/' + file.split(extension)[0]+extension+'.js', interpreted);

if (showBuildProcess) console.log('(Build [4/4]) ' + (Date.now() - startBuildTime) + 'ms to write file');
if (showBuildProcess) console.log('\n--eval() ing--\n');

eval(interpreted);