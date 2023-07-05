import levels from '../../data/levels.json';
import { DefaultCallback } from '../../types/default';
import { LevelData, NumeratedLevel } from '../model/level-data';
import validateSelector from '../../utils/validator';
import { UserData } from '../model/level-data';
import parseMarkdown from '../../utils/parse-markdown';

export default class AppController {
  private levels: LevelData[];

  private currentLevelIndex: number;

  private userData: UserData;

  private static STORAGE_KEY = 'css-pets-quaqva';

  public constructor() {
    this.levels = levels as LevelData[];
    this.levels.forEach((levelData) => {
      const data = levelData;
      data.description = parseMarkdown(data.description);
    });

    this.userData = this.loadUserData();
    this.currentLevelIndex = this.userData.currentLevel;
  }

  private loadUserData(): UserData {
    const data: string | null = localStorage.getItem(AppController.STORAGE_KEY);
    if (!data) {
      const emptyData: UserData = {
        currentLevel: 0,
        completedLevels: new Array(this.levels.length).fill(false),
      };
      localStorage.setItem(AppController.STORAGE_KEY, JSON.stringify(emptyData));
      return emptyData;
    }
    return JSON.parse(data);
  }

  public saveUserData(): void {
    localStorage.setItem(AppController.STORAGE_KEY, JSON.stringify(this.userData));
  }

  public get currentLevel(): number {
    return this.currentLevelIndex;
  }

  public get completedLevels(): boolean[] {
    return this.userData.completedLevels;
  }

  public get names(): string[] {
    return this.levels.map((levelData) => levelData.name);
  }

  public get descriptions(): string[] {
    return this.levels.map((levelData) => levelData.description);
  }

  public loadLevel(index: number, callback: (level: NumeratedLevel) => void): void {
    this.currentLevelIndex = index;
    this.userData.currentLevel = this.currentLevelIndex;
    this.saveUserData();

    const level = this.levels[this.currentLevelIndex] as NumeratedLevel;
    level.index = index;
    callback(level);
  }

  public loadNextLevel(callback: (level: NumeratedLevel) => void) {
    this.loadLevel(this.currentLevelIndex + 1, callback);
  }

  public checkInput({
    viewData,
    sucessCallback,
    failCallback,
    winCallback,
  }: {
    viewData: unknown;
    sucessCallback: DefaultCallback;
    failCallback: DefaultCallback;
    winCallback: DefaultCallback;
  }): void {
    const [markup, selector] = viewData as [markup: string, selector: string];
    const isValid = validateSelector({ markup, selector, solution: this.levels[this.currentLevelIndex].solution });
    if (isValid) {
      this.userData.completedLevels[this.currentLevelIndex] = true;
      this.saveUserData();
      if (this.userData.completedLevels.every((levelCompleted) => levelCompleted)) winCallback();
      else sucessCallback();
    } else failCallback();
  }
}
