# Class 1 science discovery labs

Four Class 1 Science lessons use the optional typed `science` metadata in `lib/lessons.ts`. The existing plant lesson gains a growth activity; butterfly life, space neighbours, and day/night are new. Other grades and maths content are unchanged.

The `ScienceLab` component uses button-operated activities: provide plant needs and reveal parts, sequence butterfly stages, identify space objects, and rotate Earth to compare day/night. Models label simplified times, sizes and distances. Motion follows learner actions, stops on its own, and is disabled under reduced-motion preferences. Every activity supports keyboard input and visible text feedback without sound, speech, dragging or a timer. Start again resets only the current lab; existing lesson completion and quiz answers still use device-local demo progress. Lab exploration itself is temporary and does not award persistent lesson completion.

The content is a prototype for educator review, not a certified Class 1 syllabus. The chrysalis is a simplified diagram, not a photograph. Space models are not to scale. The Earth day/night model is viewed from above and intentionally omits tilt and seasons. Its fixed light/dark halves illustrate that Earth turns while the Sun keeps shining. Plants also need appropriate nutrients and conditions; the growth model does not simulate amounts of water or elapsed biological time.

## Image provenance

All four photographs are bundled under `public/images/science/`, resized to at most 1200 pixels and converted to WebP (quality 85); no external image requests are needed to learn. Credits and original source links are shown in the UI. Licences below apply to the photographs independently of the code licence.

| Local file     | Author / source                                                                                                                      | Reuse terms                                                        |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------ |
| sunflower.webp | [Close-up sunflower head, NathanScientific](https://commons.wikimedia.org/wiki/File:Close-up_sunflower_head,_New_Mexico,_U.S.jpg)    | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/)      |
| butterfly.webp | [Monarch butterfly (2005), J. Corey Butler](<https://commons.wikimedia.org/wiki/File:Monarch_butterfly_(Danaus_plexippus)_2005.jpg>) | Released into the public domain by the author                      |
| earth.webp     | [The Earth seen from Apollo 17, NASA / Apollo 17 crew](https://commons.wikimedia.org/wiki/File:The_Earth_seen_from_Apollo_17.jpg)    | NASA public-domain image                                           |
| moon.webp      | [Full moon, NASA / JPL / Galileo](https://commons.wikimedia.org/wiki/File:Full_moon.png)                                             | NASA public-domain image; original is an enhanced-colour composite |

Source descriptions and licence statements checked on 2026-09-16. No endorsement by the photographers or NASA is implied.

## Checks

Unit tests validate Class 1 scope, unique content identifiers, complete sequences, and existence of all credited local assets. Browser checks exercise successes, retries, reset, keyboard interaction, mobile overflow, reduced motion, image loading, quiz persistence and grade filtering. Run the standard typecheck, lint, test and build scripts, plus `build:vercel` for the static target.
