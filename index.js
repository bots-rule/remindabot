/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Application} app
 */
module.exports = app => {
  // Your code here
  app.log('Yay, the app was loaded!')

  app.on('issues.opened', async context => {
    const issueComment = context.issue({ body: 'Thanks for opening this issue!' })
    return context.github.issues.createComment(issueComment)
  })

  app.on('issue_comment.created', context => {
    if (context.payload.comment.body.match(/\/remind\s*me/)) {
      context.log('This issue comment is a reminder request.')
      const issueComment = context.issue({ body: 'I will remind you of this issue' })
      return context.github.issues.createComment(issueComment);
    } else {
      context.log('Sadly, this issue comment is a not reminder request.')
    }
  });

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
}
