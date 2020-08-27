import fs from 'fs';

export default class Config {
  public accessToken: string | undefined;
  constructor() {
    //Load accessToken from config.json
    const filePath = 'config.json';
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, null);
      if (data) {
        const config = JSON.parse(data.toString());
        this.accessToken = config.accessToken;
      } else {
        throw new Error('Failed to load config file.');
      }
    }
  }

  public getAccessToken(): string | undefined {
    return this.accessToken;
  }

  public setAccessToken(accessToken: string | undefined): void {
    this.accessToken = accessToken;
    this.save();
  }

  public save(): void {
    const filePath = 'config.json';
    fs.writeFileSync(filePath, JSON.stringify(this));
  }
}
