import blessed from 'blessed';

export class ScrapperUI {
  constructor() {
    const screen = blessed.screen({});
    // exit the program by using esc q or ctl-c

    screen.key(['escape', 'q', 'C-c'], function(ch, key) {
      screen.leave()
      return process.exit(0);
    });

    const title = blessed.text({
      parent: screen,
      content: "Precios Justos scrapper"
    });

    this.screen = screen
    this.statusText = this.createLabeledText("Status", 2);
    this.branchesText = this.createLabeledText("Total branches", 4);

    this.scrappingBranchText = this.createLabeledText("Branch", 5);
    this.branchesBar = this.createProgressBar(6);

    this.scrappingProductText = this.createLabeledText("Product", 9);
    this.productsBar = this.createProgressBar(10);

    this.totalBranches = 0;
    this.totalProducts = 0;
    this.branchCounter = 0;
    this.productCounter = 0;
  }

  render() {
    this.screen.render();
  }

  setTotalBranches(totalBranches) {
    this.totalBranches = totalBranches;
  }

  setTotalProducts(totalProducts) {
    this.totalProducts = totalProducts;
  }

  updateStatus(status) {
    this.status = status;
    this.statusText.content = `${status}`;
  }

  updateBranchCounter(counter) {
    this.branchCounter = counter;
    this.branchesBar.filled = counter * 100 / this.totalBranches;
    this.scrappingBranchText.content = `[${counter} / ${this.totalBranches}]`;
  }

  updateProductCounter(step) {
    this.productCounter += step;
    this.productsBar.filled = this.productCounter * 100 / this.totalProducts;
    this.scrappingProductText.content = `[${this.productCounter} / ${this.totalProducts}]`;
  }

  createLabeledText(label, top) {
    const labelText = blessed.text({
      top: top,
      parent: this.screen,
      content: `${label}: `,
      style: { bold: true }
    });
    return blessed.text({
      left: label.length + 2,
      parent: labelText,
    });
  }

  createProgressBar(top) {
    return blessed.ProgressBar({
      parent: this.screen,
      border: 'line',
      style: {
        fg: 'yellow',
        bg: 'default',
      },
      ch: '#',
      width: '80%',
      height: 3,
      top: top,
      left: 3,
    });
  }
}
