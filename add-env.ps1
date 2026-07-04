$envs = Get-Content .env
foreach ($line in $envs) {
    if ($line -match "^(.*?)=""(.*?)""$") {
        $key = $matches[1]
        $val = $matches[2]
        vercel env add $key production --value $val --yes --force
        vercel env add $key preview --value $val --yes --force
        vercel env add $key development --value $val --yes --force
    }
}
