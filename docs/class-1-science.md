# Class 1 science discovery labs

Twenty-eight Class 1 Science lessons use the optional typed `science` metadata in `lib/lessons.ts`. The collection has 20 NCERT-mapped modules and eight enrichment adventures. See the [complete topic map](ncert-class-1-map.md). Other grades and maths content are unchanged.

The `ScienceLab` component uses button-operated activities: provide plant needs and reveal parts, sequence butterfly stages, identify space objects, rotate Earth to compare day/night, power a leaf food factory, sort living things, match body parts and pack for different weather. Models label simplified times, sizes and distances. Motion follows learner actions, stops on its own, and is disabled under reduced-motion preferences. Every activity supports keyboard input and visible text feedback without sound, speech, dragging or a timer. Start again resets only the current lab; existing lesson completion and quiz answers still use device-local demo progress. Lab exploration itself is temporary and does not award persistent lesson completion.

The content is a prototype for educator review, not a certified Class 1 syllabus. The chrysalis is a simplified diagram, not a photograph. Space models are not to scale. The Earth day/night model is viewed from above and intentionally omits tilt and seasons. Its fixed light/dark halves illustrate that Earth turns while the Sun keeps shining. Plants also need appropriate nutrients and conditions; the growth model does not simulate amounts of water or elapsed biological time.

## Image provenance

Twenty-eight distinct lesson photographs and an original body illustration are bundled under `public/images/science/`, with photographs resized to at most 1200 pixels and converted to WebP (quality 85); no external image requests are needed to learn. Credits and original source links are shown in the UI. Licences below apply to the photographs independently of the code licence.

| Local file     | Author / source                                                                                                                      | Reuse terms                                                        |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------ |
| sunflower.webp | [Close-up sunflower head, NathanScientific](https://commons.wikimedia.org/wiki/File:Close-up_sunflower_head,_New_Mexico,_U.S.jpg)    | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/)      |
| butterfly.webp | [Monarch butterfly (2005), J. Corey Butler](<https://commons.wikimedia.org/wiki/File:Monarch_butterfly_(Danaus_plexippus)_2005.jpg>) | Released into the public domain by the author                      |
| earth.webp     | [The Earth seen from Apollo 17, NASA / Apollo 17 crew](https://commons.wikimedia.org/wiki/File:The_Earth_seen_from_Apollo_17.jpg)    | NASA public-domain image                                           |
| moon.webp      | [Full moon, NASA / JPL / Galileo](https://commons.wikimedia.org/wiki/File:Full_moon.png)                                             | NASA public-domain image; original is an enhanced-colour composite |

Source descriptions and licence statements checked on 2026-09-16. No endorsement by the photographers or NASA is implied.

## Checks

Unit tests validate Class 1 scope, unique content identifiers, complete sequences, and existence of all credited local assets. Browser checks exercise successes, retries, reset, keyboard interaction, mobile overflow, reduced motion, image loading, quiz persistence and grade filtering. Run the standard typecheck, lint, test and build scripts, plus `build:vercel` for the static target.

## Additional modules and scope

The NCERT topic mapping is documented separately. These short activities still require educator review and do not replace a full teaching programme. The eight enrichment adventures are clearly separated from that mapping. Photosynthesis is presented as an optional simple visual introduction: sunlight provides energy; water and carbon dioxide are used to make sugar and release oxygen. There are no formulae or memorisation requirements. The activity does not imply that soil is food or that plants stop all life processes at night.

The living-things sort deliberately includes a stationary living tree and a moving non-living toy car. The body activity uses pictures of eyes, nose and hands; no learner is required to see, smell, touch, hear or speak to demonstrate a bodily ability. Weather examples are simplified and explicitly acknowledge that sunshine and cold can occur together. Learning activities use taps/keyboard and are not physical experiments.

The original `public/images/science/body.svg` illustration is dedicated to [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/). It is a diagram, not a photograph. Every lesson now has a distinct topic photograph. The body illustration remains inside the matching activity. Photos load locally without external requests.

Content reference: [BBC Bitesize photosynthesis transcript](https://bam.files.bbci.co.uk/bam/live/content/zwqv46f/transcript). Curriculum context: [NCERT foundational-stage learning outcomes](https://www.ncert.nic.in/pdf/publication/otherpublications/Learning_Outcome_for_the_Foundational_Stage.pdf). These inform the scope; they do not certify this collection or establish that photosynthesis is required in Class 1.

## New photograph attribution

The following resized WebP files retain the indicated licences. CC BY-SA adaptations are distributed under their source ShareAlike licence. Resizing, WebP conversion and display cropping are the only changes. Full source URLs and modification notices are also bundled in `public/images/science/attribution.json`. Credits and licence links appear on lesson pages.

| File            | Creator and original                                                                                                                     | Licence                                                             |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| leaf.webp       | [Martin Vorel martinvorel.com](https://commons.wikimedia.org/wiki/File:Green_leaf_texture.jpg)                                           | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0)      |
| living.webp     | [Alan Hughes](https://commons.wikimedia.org/wiki/File:Meadow_and_Oak_Tree_-_geograph.org.uk_-_5171268.jpg)                               | [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0)      |
| bodyphoto.webp  | [Eyefive45](https://commons.wikimedia.org/wiki/File:Open_Palm_of_the_Left_Hand,_Fingers.jpg)                                             | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0)      |
| weather.webp    | [Frank Vincentz](https://commons.wikimedia.org/wiki/File:Rain_drops_on_window_02_ies.jpg)                                                | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/)     |
| food.webp       | [Annapoornima koppad](https://commons.wikimedia.org/wiki/File:At_Malleswaram_vegetable_market,_Bangalore.jpg)                            | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0)            |
| storage.webp    | [W.carter](https://commons.wikimedia.org/wiki/File:Open_refrigerator_with_food_at_night.jpg)                                             | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0)      |
| hygiene.webp    | [Beat Ruest](<https://commons.wikimedia.org/wiki/File:Washing_hands_with_soap_(1).jpg>)                                                  | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0)      |
| water.webp      | [Timothy A. Gonsalves](https://commons.wikimedia.org/wiki/File:Spiti_River_Kaza_Himachal_Jun18_D72_7232.jpg)                             | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0)      |
| animals.webp    | [Kanimozhi Vennila](https://commons.wikimedia.org/wiki/File:Cow_in_Field_image.jpg)                                                      | [CC0](https://creativecommons.org/publicdomain/zero/1.0/deed.en)    |
| shelter.webp    | [Andrewlister](https://commons.wikimedia.org/wiki/File:Brick.jpg)                                                                        | [Public domain](https://creativecommons.org/publicdomain/mark/1.0/) |
| family.webp     | [Jeremy Noble](https://commons.wikimedia.org/wiki/File:Picnic_basket_01.jpg)                                                             | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0)            |
| tools.webp      | [Beendy234](https://commons.wikimedia.org/wiki/File:Gardening_tools.jpg)                                                                 | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0)      |
| festivals.webp  | [Slyronit](https://commons.wikimedia.org/wiki/File:Diwali_Diya_2.jpg)                                                                    | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0)      |
| games.webp      | [Wilfredor](https://commons.wikimedia.org/wiki/File:Chess_game_Staunton_No._6_perfil_view_8.jpg)                                         | [CC0](https://creativecommons.org/publicdomain/zero/1.0/deed.en)    |
| facilities.webp | [John Phelan](https://commons.wikimedia.org/wiki/File:Princeton_Public_Library_interior,_Princeton_MA.jpg)                               | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0)            |
| transport.webp  | [Varunesh Chandra (Born in Sambalpur, Odisha, India)](https://commons.wikimedia.org/wiki/File:Passenger_Train_on_its_Way_to_Saharsa.jpg) | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0)      |
| road.webp       | [Vijayanrajapuram](https://commons.wikimedia.org/wiki/File:Zebra_crossing_line_kanhangad_01.jpg)                                         | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0)      |
| appliances.webp | [Jacek Halicki](https://commons.wikimedia.org/wiki/File:2023_Czajnik_elektryczny_N%27OVEEN.jpg)                                          | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0)      |
| safety.webp     | [Eyefive45](https://commons.wikimedia.org/wiki/File:Right_Hand_Palm.png)                                                                 | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0)      |
| fire.webp       | [Tripl3rdmc454](https://commons.wikimedia.org/wiki/File:Fire_Extinguisher_501.JPG)                                                       | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0)      |

## Focused matching practice

Four additional activities deepen food ingredients, water sources, public facilities and transport. Children select a card, then a destination; incorrect choices allow a retry, correct matches reveal explanations and a visual token, and completing the set earns a temporary celebration. Reset clears the board. No dragging or speech is required.

| Local file | Photographer and source                                                                                                   | Licence                                                        |
| ---------- | ------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| salad.webp | [Manjeshwari poet mysore](https://commons.wikimedia.org/wiki/File:Fruit_Salad_Or_Fruit_Bowl.jpg)                          | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| well.webp  | [Suyash.dwivedi](https://commons.wikimedia.org/wiki/File:Public_well_in_Surouli_Bujurg_Village,_Uttar_Pradesh,_India.jpg) | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| bank.webp  | [DesiBoy101](https://commons.wikimedia.org/wiki/File:Bank_of_India,_Mumbai_main_branch_as_viewed_from_right_side.jpg)     | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| ferry.webp | [Dead.rabbit](https://commons.wikimedia.org/wiki/File:Passenger_Ferry_on_Padma_River.jpg)                                 | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
