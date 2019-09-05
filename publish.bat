call npm run deploy

call npm version patch

call git add *;
call git commit -m "Publishing release"
call git push

call npm publish