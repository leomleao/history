# Separate media storage

The implemented site keeps media outside Git and the application image. It builds from public metadata and Markdown, then reads selected media through a read-only Nginx mount at `/media/`.

```text
media/                             # entirely ignored
  originals/                       # not served
  ingest.json                      # private preparation inputs; not served
  published/
    prototype/                     # disposable reference preview only
    exhibition/                    # actual site's only media mount
      genoa/                       # hashed responsive WebP variants
      santos/
      gambarare/
src/data/media.json                # versioned public metadata; no private paths
```

The existing `assets/` archive remains ignored and untouched. The source projects under `/Users/leo/dev/leo family history` and `/Users/leo/dev/cardross` are read-only research sources, not build inputs or serving roots.

## Local preparation and testing

`npm run media:prepare` reads the ignored ingest file and produces selected, metadata-stripped variants. Input paths resolve relative to the ingest file. Only explicitly allowed public fields reach the manifest. Variant filenames include a prefix of their SHA-256 content checksum. A changed image gets new URLs; its older variants remain available for rollback.

`npm run media:validate [-- /absolute/published/folder]` checks every visible manifest entry for file presence, byte size, checksum, dimensions, WebP format, and containment. A symlink cannot point an image outside the published folder. The unit checks cover traversal, broken references, unpublished dependencies, tampered files, and unsourced relationship claims.

`docker compose up -d --build` builds the static app and mounts `MEDIA_ROOT` (default `./media/published/exhibition`) at `/srv/media:ro`. The directory must already exist. The container runs as user 101 with a read-only root filesystem and a temporary `/tmp`; it cannot change the host's media.

During `npm run dev`, Astro proxies `/media/` to the running Docker container. The same manifest URLs therefore work in both environments.

## Server release sequence

1. Review selected text, source citations, translations, credits, and rights. This local preview contains provisional material and cannot pass `PUBLICATION_MODE=published` yet.
2. Transfer new variants to the server's published directory independently of Git and image builds. Never mount originals or incoming research.
3. Run the media validator against that directory and the new release's manifest.
4. Build with the actual `SITE_URL` and `PUBLICATION_MODE=published`; point `MEDIA_ROOT` at the verified directory.
5. Start the container behind the server's reverse proxy and verify the reading/source flow. The Compose port is loopback-only by default.
6. Keep old media needed by rollback releases. Back up the published folder and originals independently, with the appropriate access separation.

Nginx serves content-versioned media and application assets with immutable cache headers, HTML with revalidation, and missing files as 404. Directory listing is disabled. HTTP range requests are supported by Nginx's static file handling.

`MEDIA_URL_PREFIX` can point to a different HTTPS media origin at build time. The initial deployment uses `/media/` on the same host; the site itself is currently served at the hostname root with `/en/` and `/pt-br/` editions.
