#!/usr/bin/env bash
# img/ 원본을 public/photos/ 웹용으로 변환한다.
#
#   jpg / jpeg / png  ->  photo-NNN.jpg   (긴 변 1000px, 품질 70)
#   mp4 / gif         ->  photo-NNN.mp4   + photo-NNN.jpg (첫 프레임 포스터)
#
# 번호는 img/ 를 이름순으로 정렬한 순서다. 원본을 추가하면 번호가 밀리므로
# 그때는 lib/content/photos.ts 의 매핑도 같이 확인해야 한다.
set -euo pipefail
cd "$(dirname "$0")/.."

SRC=img
OUT=public/photos
mkdir -p "$OUT"
rm -f "$OUT"/photo-*.jpg "$OUT"/photo-*.mp4

n=0
for f in "$SRC"/*; do
  [ -f "$f" ] || continue
  n=$((n + 1))
  id=$(printf "%03d" "$n")
  ext=$(printf '%s' "${f##*.}" | tr '[:upper:]' '[:lower:]')

  case "$ext" in
    mp4|mov|gif)
      ffmpeg -y -loglevel error -i "$f" \
        -vf "scale='min(720,iw)':-2" -movflags faststart -pix_fmt yuv420p -crf 30 -an \
        "$OUT/photo-$id.mp4" </dev/null
      ffmpeg -y -loglevel error -i "$f" -frames:v 1 -q:v 4 \
        -vf "scale='min(1000,iw)':-2" "$OUT/photo-$id.jpg" </dev/null
      ;;
    jpg|jpeg|png|heic)
      sips -Z 1000 -s format jpeg -s formatOptions 70 "$f" --out "$OUT/photo-$id.jpg" >/dev/null 2>&1
      ;;
    *)
      echo "건너뜀(알 수 없는 형식): $f" >&2
      n=$((n - 1))
      ;;
  esac
done

echo "변환 완료: ${n}개"
echo "jpg $(ls "$OUT"/photo-*.jpg 2>/dev/null | wc -l | tr -d ' ') / mp4 $(ls "$OUT"/photo-*.mp4 2>/dev/null | wc -l | tr -d ' ')개"
du -sh "$OUT" | cut -f1 | xargs echo "용량:"
