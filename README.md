# ChorePal

Hello hello, my fellow pink fairy armadillos!

## Some Git stuffs to note:

1. To keep updated on our team's code (so probably should do this every day before you start), run
   ```
   git pull origin Dev
   ```
2. To switch to a branch, run

   ```
   git checkout <your name/branch name>
   ```

   Reminder, no need to include the brackets '<>' and make sure the branch name is accurate (e.g., Kevin vs kevin)

   Also, if you want to create and switch to a new branch, run

   ```
   git checkout -b <new branch name>
   ```

   Another helpful tip for checking what branch you're currently at

   ```
   git branch
   ```

3. When you want to commit your code, it doesn't really matter what branch you're at, because the changes are being committed locally. Feel free to

   ```
   git status
   ```

   ```
   git add <file-name> or .
   ```

   ```
   git commit -m 'your-commit-message'
   ```

4. Once you're ready to push up, here comes the tricky part! Follow these steps:
   1. Switch to Dev branch
   ```
   git checkout Dev
   ```
   2. Pull updates of Dev down to your local machine
   ```
   git pull origin Dev
   ```
   3. Switch back to your branch
   ```
   git checkout <branch-name>
   ```
   4. Merge Dev into your branch locally
   ```
   git merge Dev
   ```
   5. Resolve conflicts if there are any
   6. Push merged branch up to your branch on GitHub
   ```
   git push origin <branch-name>
   ```
   7. On GitHub, there should be a green button saying 'Compare & Create Pull Request'. Make sure it is the correct commit that you want to create the pull request with.
   - When creating the pull request, it should be
   ```
   base: Dev <-- compare: your-branch-name
   ```
   - Make sure it says 'Able to merge' before submitting the pull request!
   8. Congratulations! Nicely done!
