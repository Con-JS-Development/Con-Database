import {Database, ExtendedDatabase} from './Database.js';
import {world} from 'mojang-minecraft';

world.events.beforeChat.subscribe(eventData=>{
    if(!eventData.message.startsWith('-')) return;
    switch (eventData.message.toLowerCase()) {
        case "-delete":
            for (const [key,value] of db) {
                db.delete(key);
            }
            break;
        case '-clear':
            db.clear();
            break;
        case '-add':
            db.set('RandomKey: ' + (Math.random() * 100).toFixed(2),max);
            break;
        case '-load':
            db.loadAll();
            break;
        case '-foreach':
            for (const [key,value] of db) {
                console.warn(key,value);
            }
            for (const key of db.keysAll()) {
                console.warn(key);
            }
            break;
        default:
            break;
    }
    eventData.cancel = true;
});
const p = 'YourMum';
const max = {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance.",array:[
    {This:"MyBestFriend you645r best friend 5445veryone best friend45464 i am not sure if i an do mre then ot4564656her peoples ya its true but we need better perfo466454rmance."}
]};
const db = new ExtendedDatabase('MyOwnDB2',false);
db.hasAll(p)?console.warn('Init'):console.warn(db.set(p,{MYBestString:'"HelloBros "i nee\0d our he\\lp'}));
const o = db.get(p);
o.MYBestString += `ext LengthAnd other as you know ya its trueMyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance.MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance.MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance.MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance.MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance.MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance.MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance.MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance.MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance.MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance.MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance.MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance.MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance.";
Posted: August 9, 2022

They say that variety is the spice of life, which is why I am enjoying this enormous glass of milk alongside this week’s update! We have lots of different treats in store for you, like plenty of parity fixes and an endless jar of chili mayo. OK, maybe the last one just applies to yours truly unless the rest of you also spilled your condiments on your keyboard. As always, we appreciate all of your help and input, please report any new bugs at bugs.mojang.com and leave your feedback feedback.minecraft.net.

patchnotes_r19u2.png

New Features:

Added the updated Create New World screen on Nintendo Switch

Changes:

Added support for middle mouse click on iOS
Zombies now have a 10% chance to be able to break doors on hard difficulty (MCPE-79636)
Implemented new Marketplace error screen art and messaging
Timeout when connecting to a multiplayer game has been reduced from 180 to 90 seconds
D-Pad Left can now be held down again to move the cursor left in menus (MCPE-155976)
Instantaneous effects (Potions, Tipped Arrows) can no longer be applied to dead mobs and players
‘So Below’ music track now plays in Basalt Deltas (MCPE-70890)
Redesigned the menu toggle switches to make it easier to distinguish between the on and off states

Known Issues:

Due to an unexpected crashing issue, we have had to temporarily revert the fix for MCPE-105487, which can cause textures to turn pink after playing for long periods of time on a server
This means that this bug may continue to occur until we have a solution. Thank you for your patience while we continue to work on this important issue – we hope to have it finally fixed as soon as possible!

Fixes:

Performance / Stability

The game no longer crashes when browsing the Marketplace
Fixed a crash related to Spawn Eggs (MCPE-159302)
Prevent client/server portal travel desync on low render distance settings (MCPE-158167)
Fix potential crash when returning to the Overworld from the Nether or The End
The game no longer crashes when entering Coin Starter Bundle Screen
Fixed bugs where client state can get out of sync with server if using an item is cancelled or failed
Improved the performance of the locate biome command to mitigate stalls on the server while searching for a biome that is far away (MCPE-157609)
Fixed a crash that could occur when connected devices, like gamepads, were missing
Fixed a crash that was caused by a Villager changing its profession while trading. The Trade screen will now close if the Villager changes professions mid trade
Fixed a crash that could occur when Pistons were extending or retracting near moveable blocks and Arrows
Fixed a crash when exploring multiple categories in Marketplace on Xbox and PlayStation
Fixed a crash that could occur when teleporting and killing an entity in the same tick
Gameplay

The Wandering Trader's spawning now matches Java Edition and it will no longer spawn in water, lava, or underground (MCPE-46911)
Fixed a bug where Bows could fail to shoot an Arrow the first time they were used, this also affected Crossbows and with throwing Tridents (MCPE-159467)
Fixed a bug that caused the new Wild Update music to not play in the Wild Update biomes when in Creative mode
Fixed an issue that prevented fisherman Villagers from offering to buy Boats at max level
The secret door that leads to the Redstone room in the center of an Ancient City now opens/closes properly (MCPE-156718)
Lava in Buckets will no longer disappear when failing to be placed or dispensed into partial blocks (MCPE-50664)
Fixed an issue where enchantments on ranged weapons on mobs were not being applied (MCPE-113623)
Fixed volume level of Amethyst step chime sound when walked on by a mob
Fixed an issue where some items with durability would fail to be created from the Creative inventory
Ancient Cities have more frequent Sculk Patch generation (MCPE-154229)
Player no longer takes damage from entering a Nether portal if it is placed at Y=-21 or below (MCPE-154888)
Fixed an issue where scores on scoreboards were not being ordered properly (MCPE-141427)
Fixed a bug where fishing hooks would drop loot when killed with the /kill command (MCPE-142329)
Player’s Soul Speed is now properly activated and de-activated on Soul Sand (MCPE-157152)
Fixed a bug causing health_boost to display incorrect health values, causing the player to turn invisible and unable to interact with the world on dying
When trading, the Villager plays the correct sound based on the item in the input slot (MCPE-152555)
Skulls in Ancient Cities now better match the orientation they have in Java Edition (MCPE-153547)
Enable event filters in the root definition to be evaluated independent of sequence or randomize when a format_version of 1.19.20 or higher is specified
Fixed issue with health boost extra life not staying (MCPE-153504)
Mobs

Polar Bears no longer panic when attacked
Tadpoles flopping while on land now more closely match Java Edition and fishes in speed (MCPE-154316)
Piglins will now stop attacking if the player puts on Gold Armor (MCPE-65516)
Jobless Zombie Villagers are no longer unable to ride Minecarts or Boats (MCPE-76831)
Ravager is now able to destroy Mangrove Leaves, Azalea, Azalea Leaves, Cave Vines, Dripleaves, Spore Blossoms, and Hanging Roots (MCPE-156551, MCPE-125322)
Releasing a bucketed custom mob now spawns the correct type of mob
Fixed the order in which a bucketed mob is created when released, which means any Actor Properties on it will load correctly
Allays can now pick up and drop items at their owner when in a Boat (MCPE-156377)
Allay can now always pick up dropped Scaffolding blocks (MCPE-157512)
Allay now correctly stops dancing when music from Jukebox ends
Allays now look at targets such as players (MCPE-158222)
Fish do not shake anymore when placed in an isolated water block
Fixed a bug that caused Wolves to spawn red when summoned with entity_born or on_tame events
Fixed a bug that could cause Witches to stop spawning. The Witch Hut structure is now set as a surface spawner for Witches (MCPE-60552)
The Ender Dragon can no longer destroy Crying Obsidian, Respawn Anchor, Light, Deny, Allow, Border, and Jigsaw blocks (MCPE-158343)
Fixed a bug causing baby mobs with the minecraft:behavior.sleep goal to have a shrunken hitbox (MCPE-46040)
Allays and Bees are now less likely to get stuck in non-full blocks (MCPE-155777)
Wardens can now detect a player sneaking on top of a Sculk Sensor (MCPE-155804)
Warden can now let itself fall up to 20 blocks down, instead of just 3 (MCPE-158304)
Allays can now pick up armor pieces with a different durability than the one they are holding (MCPE-158339)
Entities that die completely now have their data removed from world file (MCPE-155283)
Fixed a bug which could cause mobs to not load into the world if their saved y-position was greater than or equal to 25
Blocks

Removed "Wood" from the names of Mangrove Wood Planks, Stairs, and Slabs (MCPE-156791)
Twisting Vines and Weeping Vines with no support now pop even when the random ticking speed is set to 0 (MCPE-69305)
Hanging Mangrove Propagules no longer drop a Propagule item when silk touched if not at max growth (MCPE-156821)
Muddy Mangrove Roots can now be placed sideways (MCPE-153721)
Hanging Mangrove Propagule no longer changes color when certain blocks are placed nearby (MCPE-156570)
End Portal Frame Block is now named "End Portal Frame" instead of "End Portal" (MCPE-76821)
Amethyst Block has been renamed to "Block of Amethyst" (MCPE-125821)
Mangrove Log, Mangrove Wood, and Stripped Mangrove Wood can now be used to craft a Campfire with Charcoal (MCPE-157271)
Campfires can once again be stacked correctly (MCPE-159398)
Fixed a bug where Pistons sometimes did not drop the Piston item when broken by the arm (MCPE-158314)
Sounds of the Smithing Table when a Villager is working are now the same as sounds when the player uses the table (MCPE-79716)
Bells can no longer catch on fire or be destroyed by fire
Mangrove and Azalea Leaves no longer prevent tree growth (MCPE-154980)
Sculk Blocks

If two vibrations are emitted at the same time, Sculk Sensors will now react to the closest one (MCPE-155793)
If two vibrations are emitted at the same time and at the same distance, Sculk Sensors will now react to the one with the highest frequency
Sculk Sensors now detect a Creeper exploding with a frequency of 15
Sculk Sensors now detect an End Crystal exploding with a frequency of 15 (MCPE-153733)
Sculk Sensors now detect a Fish being let out of a Bucket with a frequency of 12
Sculk Sensors now detect a TNT being fired out of a Dispenser with a frequency of 12
Vibration particles are now always oriented towards the target Sculk Sensor (MCPE-156648)
Sculk Catalysts now play the blooming sound effect when blooming (MCPE-153562)
Sculk Catalysts do not spread Sculk anymore on players' death if the Keep Inventory gamerule is set to True (MCPE-157884)
Sculk Catalysts do not get covered in Sculk Veins anymore if a mob dies on top of them
Sculk Catalyst now blooms when a mob with no experience dies next to it
Sculk Sensors can now also detect Bees, Chickens, Allays, Phantoms, and Ender Dragons flying (MCPE-153725, MCPE-154055)
Sculk Sensors can now emit the whole range of Redstone signal strengths, based on the distance a vibration has been emitted at. Previously, the output was either 1, 15 or even
Sculk Sensors no longer detect Boats staying still in water (MCPE-155368)
Reduced Sculk Catalyst experience drop from 20 to 5
Sculk Patch Features can now be placed on additional block types (MCPE-156669)
Graphical

Fixed bug causing FOV to stutter when sprinting while the player has a speed effect applied
With data-driven block tessellation, geometry box pivot-base rotation now rotates around the correct pivot point
Fixed x-ray vision when Top Snow falls on top of player so it now behaves as a solid block when Top Snow covers player's vision (MCPE-150709)
Fixed an issue with RTX on Windows where point lights were unintentionally accumulated for emissive blocks (MCPE-159485, MCPE-159488)
User Interface

The Toggle Perspective hint now shows the player’s assignment instead of the default assignment
Saddled Pig's tooltip changed to "Ride" instead of "Mount"
Added content warnings for large icons for texture tessellation (e.g. objects in hand)
Fixed an issue where players were not able to hover over UI elements inside a scroll view if a portion of it fell outside of the view when using mouse + keyboard on iOS. This was a result of the scroll view auto focusing onto the nearest non-clipped element
Hover text for can_place_on blocks for items in inventory is now in a consistent order between game saves (MCPE-153516)
Removed the controller settings tab for Oculus
Goat Horn sound is now placed in the Jukebox/Note Blocks sound category in Settings (MCPE-154885)
Fixed the Add Server feature not saving IPV6 addresses (MCPE-66233)
Realms

Updated the Realms Plus FAQ to clarify that all Bedrock platforms can purchase Realms Plus (MCPE-157869)
Fixed an error where creating a new Realm would navigate out to the Play screen instead of returning to the Create New World screen
The Realms feed screenshot button is now available for VR platforms
Spectator Mode (Experimental)

Removed emotes functionality while in Spectator Mode
Player can now place blocks where spectator is hovering
Players now have their hands back when they are holding a map when they have one item in offhand and one in main hand, curious how they held it without hands...
Spectators’ heads are now properly rendered as semi-transparent
Character Creator head items (hats, hoods, helmets, etc.) are now properly rendered semi-transparent while in Spectator mode
Capes and animated back items are no longer rendered while in Spectator mode (MCPE-156929)
Spectators can no longer use or get affected by portals (MCPE-156684)

Technical Updates:

Updated Add-On Template Packs

Updated Add-On templates for19.20 with new resources, behaviors, and documentation, are available to download at aka.ms/MCAddonPacks
General

Fixed a Disconnect Packet vulnerability used to crash Bedrock Server
Blocks with their render_methodcomponent set to double_sided now have their back faces properly rendered
Limit the number of elements in the conditionsfield of the minecraft:part_visibility to 64
Renamed minecraft:aim_collisionblock component to minecraft:selection_box
renamed the 'minecraft:block_light_emission' component to 'minecraft:light_emission' and changed its accepted value type from float to int
Renamed 'minecraft:destroy_time' to 'minecraft:destructible_by_mining' and restructured the component to be either defined as a boolean or as an object
Setting the component to true will give the block the default destroy time and setting it to false will make the block indestructible by mining
Setting the component as an object will let users define the number of seconds needed to destroy the block with base equipment
Changed the minecraft:frictioncomponent to represent friction of block instead of movement
Removed the component minecraft:unwalkable
Renamed 'minecraft:explosion_resistance' to 'minecraft:destructible_by_explosion' and restructured the component to be either defined as a boolean or as an object
Setting the component to true will give the block the default explosion_resistance and setting it to false will make the block indestructible by explosion
Setting the component as an object will let users define the resistance of the block to a base explosion
Added /tagsfromitem and /itemswithtag commands which output the tags associated with an item and vice versa
Added a new dedicated server property, "chat-restriction", that can be modified in the "server.properties" file to restrict the chat for all players connecting to the server. The property's possible values are "None", "Dropped", and "Disabled". See the default file for more information
Server developers can now see checksums of the block registry from the server and client to check for mismatch (search "Block Registry Checksum" in the output logs and compare)
Added a server property disable-player-interaction which informs clients that they should ignore other players when interacting with the world
Modified the json entity file so that it also contains projectile damage in addition to the explosion and fire damage (MCPE-153740)
Items with the item_lockcomponent can no longer be placed in Item Frames or Armor Stands (MCPE-138479)
Actor Properties

Added Content Errors for when there are too many properties on the actor (more than 32) or when a string enum name is too long (more than 32 characters)
Added new Molang had_component_group to allow calculating appropriate default values from previously saved entity data
Renamed 'actor_property' and 'has_actor_property' Molang queries to 'property' and 'has_property'. Also renamed 'set_actor_property' to 'set_property'
Update 'set_property' to only allow changing properties on the local actor rather than some other target
Restored ability to use a Molang expression string for default values of Actor Properties (These are primarily useful for random starting values)
GameTest Framework

Performance Watchdog
Added a performance watchdog that monitors GameTests for slow-running scripts
Executing a slow-running script will result in content log warnings
Additionally, long script hangs (more than 3 seconds in a single tick) will result in an exception
Added new properties to propertiesfor watchdog configuration on Dedicated Server
script-watchdog-enable- Enables the watchdog (default = true)
script-watchdog-hang-threshold- Sets the watchdog threshold for single tick hangs (default = 3000 ms)
script-watchdog-spike-threshold- Sets the watchdog threshold for single tick spikes (default = 100 ms)
script-watchdog-slow-threshold- Sets the watchdog threshold for slow scripts over multiple ticks (default = 2ms)
Updated mojang-minecraft-uiforms to respond when the client was unable to show a modal form
Renamed isCanceledfield to canceled
Added cancelationReasonfield
Added FormCancelationReasonenum
ScoreboardObjectiveDisplayOptions
Added 'ScoreboardObjectiveDisplayOptions' class
Added read-only property 'Objective: objective'
Added read-only property 'ObjectiveSortOrder: sortOrder'
Scoreboard
Added function 'removeObjective(objectiveId: string | Objective): void' - Untracks an objective
Added function 'addObjective(objectiveId: string, displayName: string): Objective' - Creates and objective to be tracked, identified with objectiveId and displayed on the screen with displayName
Added function 'getObjectiveAtDisplaySlot(displaySlotId: string): ScoreboardObjectiveDisplayOptions' - Gets objective and sort order contained in the DisplayObjective slot specified by displaySlotId
Added function 'setObjectiveAtDisplaySlot(displaySlotId: string, ScoreboardObjectiveDisplayOptions: scoreboardObjectiveDisplayOptions): Objective' - Sets the objective and sort order of the display slot, as specified by displaySlotId
Added function 'clearObjectiveAtDisplaySlot(displaySlotId: string): Objective' - Clear's the DisplayObjective of the objective it is currently displaying
Block
Added Block SignComponent that allows for retrieving of the value of sign text - Accessible from getComponent("sign")on sign blocks
BlockSignComponent
Added read-only property text: string- Gets the sign text
System Events
Added event beforeWatchdogTerminate- Shuts down the server when a critical scripting exception occurs (e.g. script hang). Can be canceled to prevent shutdown
Added enum WatchdogTerminateReason- Specifies the reason for watchdog termination
Added new properties to propertiesfor watchdog configuration on Bedrock Dedicated Server
script-watchdog-enable-exception-handling- Enables watchdog exception handling via the events.beforeWatchdogTerminate event (default = true)
script-watchdog-enable-shutdown- Enables server shutdown in the case of an unhandled watchdog exception (default = true)
script-watchdog-hang-exception- Throws a critical exception when a hang occurs (default = true)
`;
db.set(p,o);