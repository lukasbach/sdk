export class UtilsModule {
  private rootTitle: string | undefined;

  public addFontPackage(fontPackage: string) {
    const url = fontPackage.startsWith("http")
      ? fontPackage
      : `https://fonts.lukasbach.com/${fontPackage}.css`;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = url;
    document.head.appendChild(link);
  }

  public setTitle(title: string) {
    document.title = this.rootTitle ? `${title} - ${this.rootTitle}` : title;
  }

  public setRootTitle(title: string | undefined) {
    this.rootTitle = title;
  }
}
