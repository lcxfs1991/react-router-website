require('dotenv').config();
const { Octokit } = require('@octokit/rest');  
const { ensureFileSync, writeFileSync } = require('fs-extra');
const path = require('path');
  
// GitHub仓库信息  
const repoOwner = 'lcxfs1991';  
const repoName = 'react-router';  
const srcPath = 'docs';
const targetPath = './';

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
});

// 递归获取目录下的所有文件  
async function getFilesInDirectory(srcPath, targetPath, depth = 0) {  
  const result = await octokit.rest.repos.getContent({  
    owner: repoOwner,  
    repo: repoName,  
    path: `${srcPath}`, // 注意路径后面的斜杠，它表示目录  
    depth: depth  
  });  
  
  result.data.forEach(async (item) => {  
    if (item.type === 'file') {  
      // 检查文件扩展名是否为.md  
      if (item.name.endsWith('.md')) {  
        console.log(`Found Markdown file: ${item.path}`);  
        // 如果有需要，你也可以下载文件内容  
        const fileContent = await octokit.repos.getContent({  
          owner: repoOwner,  
          repo: repoName,  
          path: item.path  
        });
        let targetFilePath = path.join(process.cwd(), targetPath, `./${item.path}`);
        console.log('targetFilePath:', targetFilePath);
        ensureFileSync(targetFilePath);
        writeFileSync(targetFilePath, Buffer.from(fileContent.data.content, 'base64').toString());
      }  
    } else if (item.type === 'dir') {  
      // 递归处理子目录  
      getFilesInDirectory(item.path, targetPath, depth + 1);  
    }  
  });  
}  
  
// 开始获取文件  
getFilesInDirectory(srcPath, targetPath, 1);