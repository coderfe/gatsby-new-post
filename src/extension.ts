import * as vscode from "vscode";
import { outputFile } from "fs-extra";
import { resolve } from "path";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "extension.NewGatsbyPost",
    async () => {
      const {
        showInputBox,
        showInformationMessage,
        showErrorMessage
      } = vscode.window;
      const { postsDir, frontmatter } = getConfiguration();

      let filename = await showInputBox({
        placeHolder: "Filename of post, like: how-to-use-gatsby"
      });
      if (!filename) {
        return showInformationMessage("Canceled");
      }

      const { workspaceFolders } = vscode.workspace;
      if (!workspaceFolders) {
        return showErrorMessage("No folder opened");
      }
      const { fsPath: rootPath } = workspaceFolders[0].uri;

      filename = filename.replace(/\?\/\\&\s/gi, "");
      const filePath = resolve(rootPath, postsDir, filename + ".md");

      outputFile(
        filePath,
        fileContent(frontmatter),
        { encoding: "utf-8" },
        err => {
          if (err) {
            return showErrorMessage(err.message);
          }
          showInformationMessage(`${filePath} created!`);
        }
      );
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}

function getConfiguration() {
  const cfg = vscode.workspace.getConfiguration("gatsby");
  const postsDir = cfg.get("postsDir") as string;
  const frontmatter = cfg.get("frontmatter") as [];

  return { postsDir, frontmatter };
}

function fileContent(frontmatter: string[]) {
  return ["---", ...frontmatter, "---"]
    .map(item => (item !== "---" ? `${item}: ''` : `${item}`))
    .join("\n");
}
