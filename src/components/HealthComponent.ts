import {BaseComponent} from './BaseComponent';
import {NumberUtils} from '../utils/NumberUtils';

export class HealthComponent extends BaseComponent {
  private currentHealth: number;
  private maxHealth: number;
  private minHealth: number;

  constructor() {
    super();

    this.currentHealth = 0;
    this.maxHealth = 0;
    this.minHealth = 0;
  }

  /**
   * Получение текущего значения здоровья
   */
  get health(): number {
    return this.currentHealth;
  }

  /**
   * Получение максимального значения здоровья
   */
  get max(): number {
    return this.maxHealth;
  }

  /**
   * Установка текущего значения здоровья между минимальным и максимальным
   */
  set health(v: number) {
    this.currentHealth = NumberUtils.clamp(this.minHealth, this.maxHealth, v);
  }

  set max(v: number) {
    this.maxHealth = NumberUtils.clamp(this.minHealth, Infinity, v);
  }

  /**
   * Прибавка или отбавка к здоровью
   * @param v значение, на которое изменится здоровья
   * @example
   * healthComponent.health = 10;
   * healthComponent.addHealth(10)
   * expect(healthComponent.health).toEqual(10 + 10);
   * healthComponent.addHealth(-10)
   * expect(healthComponent.health).toEqual(20 - 10);
   */
  public addHealth(v: number): void {
    this.currentHealth = NumberUtils.clamp(this.minHealth, this.maxHealth, this.currentHealth + v);
  }

  /**
   * Проверка, что значение здоровья минимально возможному
   * @returns равно ли значение здоровья минимально возможному
   */
  public isDead(): boolean {
    return this.currentHealth === this.minHealth;
  }
}
