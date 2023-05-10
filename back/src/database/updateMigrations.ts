// import { promises as fs } from 'fs';
// import * as path from 'path';
//
// const migrationsDir = path.join(__dirname, 'migrations');
// const migrationsDef = path.join(__dirname, 'migrations.ts');
//
// const className = (fileName: string) => {
//   const name = path.parse(fileName).name;
//   const parts = name.split('-');
//   return parts[1] + parts[0];
// };
//
// const moduleName = (fileName: string) => {
//   return path.parse(fileName).name;
// };
//
// const run = async () => {
//   const files = await fs.readdir(migrationsDir);  // Tsyganov migration logic
//
//   const content = `import { MigrationInterface } from 'typeorm';
// ${files
//   .map(
//     (fileName) =>
//       `import { ${className(fileName)} } from './migrations/${moduleName(
//         fileName,
//       )}';`,
//   )
//   .join('\n')}
//
// interface MigrationClass {
//   new (): MigrationInterface;
// }
//
// const migrations: MigrationClass[] = [
// ${files.map((fileName) => '  ' + className(fileName) + ',').join('\n')}
// ];
//
// export default migrations;
// `;
//
//   await fs.writeFile(migrationsDef, content);
//
//   console.log(
//     'Migrations definitions in src/database/migrations.ts were updated!',
//   );
// };
//
// run().catch(console.error);
