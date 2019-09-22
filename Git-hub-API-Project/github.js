class Github {
  constructor() {
    this.client_id = "df7476b623658c3c0764";
    this.client_secret = "745d5f47260d7900f7452cf163e76e37468bc46d";
    this.repos_count = 5;
    this.repos_sort = "created: asc";
  }

  async getUser(user) {
    const profileResponse = await fetch(
      `https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`
    );

    const repoResponse = await fetch(`https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=
      ${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`);

    const repos = await repoResponse.json();
    const profile = await profileResponse.json();
    return {
      profile,
      repos
    };
  }
}
