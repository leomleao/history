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
      history/                     # separate shared-entrance cover variants
src/data/media.json                # versioned public metadata; no private paths
src/data/history-media.json        # shared-entrance metadata; separate from Panzonato
```

The existing `assets/` archive remains ignored and untouched. The source projects under `/Users/leo/dev/leo family history` and `/Users/leo/dev/cardross` are read-only research sources, not build inputs or serving roots.

## Local preparation and testing

`npm run media:prepare` reads the ignored ingest file and produces selected, metadata-stripped variants. Input paths resolve relative to the ingest file. Only explicitly allowed public fields reach the manifest. Variant filenames include a prefix of their SHA-256 content checksum. A changed image gets new URLs; its older variants remain available for rollback.

`npm run media:validate [-- /absolute/published/folder]` checks both the Panzonato and shared-entrance manifests for file presence, byte size, checksum, dimensions, WebP format, and containment. Both manifests use paths relative to the same published folder. A symlink cannot point an image outside that folder. The unit checks cover traversal, broken references, unpublished dependencies, tampered files, and unsourced relationship claims.

`docker compose up -d --build` builds the static app and mounts `MEDIA_ROOT` (default `./media/published/exhibition`) at `/srv/media:ro`. The directory must already exist. The container runs as user 101 with a read-only root filesystem and a temporary `/tmp`; it cannot change the host's media.

During `npm run dev`, Astro proxies `/media/` to the running Docker container. The same manifest URLs therefore work in both environments.

## Server release sequence

For the current preview on the home server, use the `history/` service in the
`home-server-docker` repository. Its `setup.md` gives the transfer and deployment
commands. The serving root is `/home/leo/history/media/`, mounted at `/srv/media`
read-only; the server backup and restore scripts include it. Nginx listens on
`127.0.0.1:18775`; the server's Cloudflare proxy serves `https://history.byleo.uk/`.
The steps below apply when moving from that preview to a reviewed public release.

1. Review selected text, source citations, translations, credits, and rights. This local preview contains provisional material and cannot pass `PUBLICATION_MODE=published` yet.
2. Transfer new variants to the server's published directory independently of Git and image builds. Never mount originals or incoming research.
3. Run the media validator against that directory and the new release's manifest.
4. Build with the actual `SITE_URL` and `PUBLICATION_MODE=published`; point `MEDIA_ROOT` at the verified directory.
5. Start the container behind the server's reverse proxy and verify the reading/source flow. The Compose port is loopback-only by default.
6. Keep old media needed by rollback releases. Back up the published folder and originals independently, with the appropriate access separation.

Nginx serves content-versioned media and application assets with immutable cache headers, HTML with revalidation, and missing files as 404. Directory listing is disabled. HTTP range requests are supported by Nginx's static file handling.

`MEDIA_URL_PREFIX` can point to a different HTTPS media origin at build time. Media stays at `/media/` on the same host while the exhibition uses `/panzonato/en/` and `/panzonato/pt-br/`. The shared entrance uses `/` and `/home/pt-br/`; changing the page namespace does not relocate the media directory.

## The Atlantic voyage map

The supplied Rand McNally world map remains unchanged in the ignored `Rand-McNally Library Map Of The World3185956163883745958/` folder, excluded from the Docker build context. Its original JPEG is 14,948 × 10,379 pixels. Only the Atlantic crop is served, as four content-hashed WebP files under `media/published/exhibition/voyage-map/`: 960, 1600, 2400 and 3150 pixels wide. The largest is the crop’s native width; nothing is enlarged.

`src/data/voyage-map.json` records the crop rectangle and manually calibrated route geometry. `src/data/media.json` is the source of public image URLs and checksums; the source catalog records the map’s 1903 date and David Rumsey credit. Route and ship graphics are separate SVG overlays, so the historical map pixels remain unchanged.

This crop was prepared separately with Sharp (WebP quality 82, effort 6, smart subsampling). The generic `media:prepare` command replaces its output manifest with its ingest selection: when reprocessing other media, write to a temporary manifest and merge by ID so the separately prepared map and historical additions remain registered. Transfer `voyage-map/` with the rest of the published media folder when moving the Docker preview to another server.

## Shared-entrance photography

The Cardross panel uses the archive's `AST-000110`, an 1862 photograph of the house attributed to an unknown photographer. The archived article `SRC-000012` credits National Galleries of Scotland and states CC BY-NC without a license version; the public metadata preserves that qualification. The source JPEG remains unchanged in the read-only Cardross archive.

Three metadata-stripped WebP variants, 480, 800 and 1200 pixels wide, live under `history/cardross-house-1862/` inside the existing media mount. Together they occupy 279,066 bytes. `src/data/history-media.json` records their hashes, dimensions, bilingual captions, rights, and provenance independently of Panzonato's archive. The `getHistoryMedia` helper uses the same media URL prefix and publication boundary as the exhibition. Transfer `history/` alongside the other published media directories when moving the site.
