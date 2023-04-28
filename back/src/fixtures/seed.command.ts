import { Command, CommandRunner } from 'nest-commander';
import { FixturesService } from './fixtures.service';

@Command({ name: 'seed', description: 'Load Fixtures' })
export class SeedCommand extends CommandRunner {
  constructor(private readonly fixturesService: FixturesService) {
    super();
  }

  async run(): Promise<void> {
    console.log('======= Dropping tables! =======');
    await this.fixturesService.dropTables();
    console.log('======= Done! =================');
    console.log('======= Creating users! =======');
    await this.fixturesService.createUsers();
    console.log('======= Done! =================');
    console.log('======= Creating categories! =======');
    await this.fixturesService.createCategories();
    console.log('======= Done! =================');
    console.log('======= Creating courses! =======');
    await this.fixturesService.createCourses();
    console.log('======= Done! =================');
    console.log('======= Creating modules! =======');
    await this.fixturesService.createModules();
    console.log('======= Done! =================');
    console.log('======= Creating lessons! =======');
    await this.fixturesService.createLessons();
    console.log('======= Done! Ready to work! =================');
  }
}
