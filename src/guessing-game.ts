import { GuessResult } from "./guess-result";

export class GuessingGame {
  readonly minRange: number = 1;
  readonly maxRange: number;

  readonly maxGuesses: number;
  readonly secret: number;

  readonly lastGuess: number = 0;
  private remainingGuesses: number;
  isGameOver: boolean = false;
  playerWon = false;

  constructor(maxRange: number, numberOfGuesses: number) {
    this.maxRange = maxRange;
    this.maxGuesses = numberOfGuesses;
    this.remainingGuesses = this.maxGuesses;

    this.secret = this.generateSecret();
  }
  private generateSecret(): number {
    let r = Math.random();
    r = r * this.maxRange + this.minRange;
    r = Math.floor(r);
    return r;
  }

  guess(guess: number | null): GuessResult {
    let validationResult = this.validate(guess);
    if (validationResult != null) {
      return validationResult;
    }

    return this.checkAnswer(guess!);
  }

  private validate(answer: number | null): GuessResult | null {
    if (answer == null) return new GuessResult(true, "Please enter a number");

    if (answer < this.minRange || answer > this.maxRange) {
      return new GuessResult(
        true,
        "Please enter a number between ${this.minRange} and ${this.maxRange}",
      );
    }

    if (!Number.isInteger(answer)) {
      return new GuessResult(true, "Please enter a whole number");
    }
    return null;
  }

  private checkAnswer(guess: number): GuessResult {
    this.remainingGuesses -= 1;
    let message = "";

    if (guess === this.secret) {
      message = "Congratulations! You guessed the secret number!";
      this.playerWon = true;
    } else if (guess < this.secret) {
      message = `${guess} is too low!`;
    } else {
      message = `${guess} is too high`;
    }
    if (this.remainingGuesses === 0 && !this.playerWon) {
      message = "You loser! The secret number was ${this.secret}!";
      this.isGameOver = true;
    }

    return new GuessResult(false, message);
  }
}
