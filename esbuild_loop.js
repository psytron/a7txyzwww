import esbuild from 'esbuild';
import { promises as fs } from 'fs';
import path from 'path';

// Ensure web_modules directory exists
const webModulesDir = path.join(process.cwd(), 'web_modules_2');
await fs.mkdir(webModulesDir, { recursive: true });

// List of packages to bundle
const packages = [
    'three',
    'three/addons'
    // add more packages as needed
];

const buildPackage = async (pkg) => {
    try {
        await esbuild.build({
            entryPoints: [`../node_modules/${pkg}`],
            bundle: true,
            format: 'esm',
            outfile: path.join(webModulesDir, `${pkg}.js`),
            external: [], // Specify external dependencies if any
        });
        console.log(`Successfully built ${pkg}`);
    } catch (error) {
        console.error(`Failed to build ${pkg}`, error);
        process.exit(1);
    }
};

// Build all packages
for (const pkg of packages) {
    await buildPackage(pkg);
}
