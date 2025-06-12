import {
  correctTranscriptErrors,
  getEntitiesNer,
  makeLlmPrompt,
  validateCoins,
} from "../Llm.js";
import { LLMFactory } from "../llm/factory.js";
import { formatTimestamp, validateTimestamps } from "../utils.js";
import Fuse from "fuse.js";

// async function fetchKnowledge() {
//   const { data, error } = await supabase
//     .from("knowledge")
//     .select("*")
//     .eq("hasUpdatedTranscript", false);

//   if (error) {
//     console.error("Error fetching knowledge:", error);
//     return [];
//   }
//   return data;
// }

// async function updateKnowledge({ analysis, summary, link, usage }) {
//   analysis = JSON.parse(analysis);
//   summary = JSON.parse(summary);

//   const llm_answer = {
//     projects:
//       Array.isArray(analysis) && analysis[0]?.projects
//         ? analysis[0].projects.map((project) => ({
//             coin_or_project: project.coin_or_project,
//             marketcap: (
//               project.Marketcap ||
//               project.marketcap ||
//               ""
//             ).toLowerCase(),
//             rpoints: Number(project.Rpoints || project.rpoints || 0),
//             total_count: Number(
//               project["Total count"] || project.total_count || 0
//             ),
//             category: Array.isArray(project.category) ? project.category : [],
//           }))
//         : [],
//     total_count: Number(analysis[0]?.total_count || 0),
//     total_rpoints: Number(
//       analysis[0]?.total_Rpoints || analysis[0]?.total_rpoints || 0
//     ),
//   };
//   const { data, error } = await supabase
//     .from("knowledge")
//     .update({
//       hasUpdatedTranscript: true,
//       usage: usage,
//       llm_answer: llm_answer,
//       summary: summary,
//     })
//     .eq("link", link);

//   if (error) {
//     console.error("Error updating knowledge:", error);
//     return null;
//   }
//   return data;
// }

// export const makeAnalysisBat = async () => {
//   const data = await fetchKnowledge();
//   console.log(`Starting Analysis for ${data.length} items`);

//   for (const item of data) {
//     console.log(`Processing item with link: ${item.link}`);

//     try {
//       const { analysis, summary, usage } = await makeLlmPrompt({
//         model: "grok",
//         transcript: item.corrected_transcript,
//       });
//       await updateKnowledge({
//         link: item.link,
//         analysis: JSON.stringify(analysis),
//         summary: JSON.stringify(summary),
//         usage: usage,
//       });
//       console.log(`Successfully processed item: ${item.link}`);
//     } catch (error) {
//       console.error(`Error processing item ${item.link}:`, error);
//     }
//   }

//   console.log("Analysis completed for all items");
// };

// const analysisMessages = [
//   {
//     role: "system",
//     content: "You are an intelligent assistant",
//   },
//   {
//     role: "user",
//     content: "Is destra a crypto coin? Or is it wrongly written?",
//   },
// ];
// const grok = LLMFactory.createProvider("grok");
// const results = await grok.makeRequest(analysisMessages);
// const content = await grok.processResponse(results);
// console.log("Results: " + content.content);

// const { transcript, usage, default_content, entities, error } =
//   await correctTranscriptErrors({
//     transcript: `it's time for my most important video of the year or potentially my most important video for the next four years
// and that's because today I'm going to be giving you a complete overview of my portfolio for 2024 I'm going to be
// explaining to you why I'm buying what I'm buying the odds that I see of this bet working out and of course my plan to
// eventually sell these assets for what I hope will be a life-changing amount of money but it's time to get real here and
// talk about the brass tax I'm going to be going into the hot narratives gaming AI layer ones and helping you pull apart
// and understand exactly why I believe these projects are going to win now in December of 2020 I did a similar video
// and I called out axi Infiniti on December 7th 2020 the price of axi
// Infiniti was about 55 and it went on to Peak here at
// $160 that my friends is not a 100x that is a 300X now beyond that you you know that
// I've called some of the absolute biggest most face melting gainers of 2023 a year
// in which most people told us that Bitcoin and all of crypto was going to zero Bitcoin will go to zero and we
// proved them wrong in fact I do believe that this channel has nailed it more so than almost any other in the entire
// crypto space but it's time to get real all of this crypto stuff is a massive risk that's why there's the potential
// upside for literally life-changing gains in the short amount of time when you compare it to any other industry that
// also means you got to be prepared for that downside even the best projects in this space could crash 70 80 90% in fact
// some of these projects are so degenerate that you must seek medical help if you want to actually buy them literally the
// only way you'll be able to view yourself if you lose money here is with clown makeup and a wig so if we're going to do
// this crypto thing you got to put on your big boy pants you got to take responsibility for each and every coin
// you buy and most important importantly you have to have a plan why are you buying it what do you believe the valuation for this asset could be and
// when at what price points will you sell this thing because if you can't answer those questions you are forever going to
// be fish food to the sharks swimming around you in the crypto waterers now let's talk about the first thing which
// is why right now is actually really good timing now Bitcoin does this thing where it goes on a four-year cycle it has
// three good years and then one terrible year the problem is that most people get in when Bitcoin is at the Apex of that
// one candle they get in at the top when everybody's screaming about crypto how they made all this money Dogecoin
// Millionaires and so on and so forth the higher Bitcoin and crypto goes in price the more dangerous it is that it could
// drop in price of course if you flip that around the lower it goes the safer it is to buy and the more likely you are to
// get the good price close to the bottom and that's why we were buying as soon as we saw some good indications out of the
// FED when they stepped in and started saving banks in March that's when we hopped in here and said hey look I think
// think that these bailouts are going to create more liquidity and form a bottom I think the bleed is over and it's time
// to start allocating even though it feels uncomfortable and it will feel uncomfortable even in these bull runs
// there are crazy dips as my buddy Alex Becker would say my co-founder in neotokyo this is a chart you're going to
// see everywhere where you see the massive sell-offs that happened all the way up during the 2017 rally the fact is that
// bull runs are actually the time to buy the dip bare markets are where you sell the rally if you think about it the
// overall trend is up so you want to buy as it comes down cuz you know it's going to go back up or at least you have a
// good idea that the trend will continue remember the trend is your friend and the same is true of the bare Market
// while things are macro going down you want to sell them as they rally up cuz that's your chance to get out at a good
// price now I wanted to add in here that Bitcoin is now in a dip and the whole Market has pretty much taken a massive
// dip well not every coin of course beam and immutable X are still crushing it but you you know most of the coins here
// have taken a bit of a dip there's plenty of coins in the red here over the last few days and honestly it's kind of
// popping up right now so you know it's at 42,000 if it gets back above this you know $43,000 Mark or so you know if it
// gets back Above This 425 or specifically above 43 44 this dip is over right this
// is going to to new highs for the year what I want to impress upon you is this dips are effectively the thing that you
// want you don't want to just be chasing when things are up up and away that might feel like the best time to invest
// it certainly is the most exciting but what you really want to wait for are the times that it's not exciting again so if
// this dip gets worse goes down into the 30s or so maybe even the low3s that would not be the end of times now it
// would be very concerning if we go below you know 31,000 or 32,000 that is a very
// sensitive area and might signal a much more difficult time for Bitcoin ahead
// really all of crypto but in the case of right now anything above 32,000 to me is
// a massive massive opportunity if it comes down and the more uncomfortable it gets the more the Bears come out of
// their caves and start screaming it was all a dream this was the biggest bull trap in the history of the world well
// that to me my friends is the time that all be looking to smash the buy button but again I'm not doing too much right
// now I've been buying throughout 2023 and so I'm pretty well positioned here coming into 2024 but I hope this video
// helps you out a lot and back to the analysis so the point is right now we are still in this three candle which is
// right before the two most parabolic years the two best years of the Bitcoin cycle that is if the cycle is to
// continue to play out the way it worked before now a lot of people don't believe in this cycle stuff but get this you
// want to see something crazy from the all-time low in 2015 to the all-time high in 2017 it was exactly
// 1,64 days from the all-time high in 2017 to the all-time low in 2018 it was
// exactly 364 days from all-time low in 2018 to alltime high in 2021 1, 64 days
// again exactly the time from low to high and then once again from all-time high
// in November of 2021 to alltime low in November of 2022
// 364 days honestly some things are Stranger Than Fiction and Bitcoin very
// well might be one of those maybe we're all in a simulation maybe this is all some collective delusion maybe there are
// no coins at all what I do know is that as long as this Bitcoin cycle continues to show itself and prove itself out as
// it has once again in 2023 I feel like I would be a damn fool not to bet hard on
// the industry that I log into and talk about and obsess over every single day so that's what I'm doing but make no
// mistake this is risky business and everything you buy into could be manipulated crash the founders could end
// up not being honorable or doing the right thing the code could get hacked stuff is very very risky and you assume
// a 70 to 100% loss whenever you buy anything in this crypto space the
// trade-off here is you're trading a 70% downside for a potential thousand or
// 10,000% upside that's 10 to 100x upside versus a near total loss those are
// better odds than you're going to get in Vegas almost any day of the week and for that reason I'm all in on crypto gambling to make my life better and if
// you're here in crypto right now watching a video like this you need to slam down some hard to swallow pills and
// understand that you're gambling too well to be fair we all need to gamble that's what the Fiat system forces us to do cuz
// your money turns to dust in your wallet your labor is not worth anything anymore we need to gamble in stocks in real
// estate in assets of some kind if you want to get ahead and to me crypto is the one that I know and it's the one
// that I think is the most generous and most likely to help people Achieve Financial Freedom so I'm gambling here
// and with that said let's get to my portfolio for 2024 of course we should add that Michael sailor the biggest bull
// on Wall Street believes Bitcoin will hit a $350,000 price in 2024 now that would
// mean that Bitcoin is about 10x from here of course what we saw over the last one
// was Bitcoin went about 3x over its prior all-time high now if Bitcoin goes to 350k that would mean it would do a 5x
// over its prior all-time high whereas last cycle it did about a 3 and 1/2x over its prior alltime high so it's
// going way higher and that would mean that what we'd see out of total three meaning the altcoins would probably be
// even more dramatic right we saw a gain here of total three which went from about 300 billion up to 1.3 trillion
// this was about a 212% gain or almost a 3X out of the altcoins now if we go 50%
// more that means we could see about a 4X out of the altcoins from prior all-time high and that would mean altcoins alone
// would be at $4.5 trillion doll not to mention you add in Bitcoin and eth you have crypto scratching its head on
// nearly $1 trillion in market value that my friends is the size of gold and that
// my friends is a whole new ball game as they would say and as always I solicited the community I said I'm doing my 2024
// portfolio video this week what coins should I include and I literally in a few hours got almost 1,000 responses and
// they were really bad they were terrible I am not taking advice from you guys ever again I don't know what you're trying to do to me but please God stop
// trying to give me Alpha because it is not working anyway back to the show all right let's get into it this is going to
// be a complete breakdown of the 2024 portfolio and I'm not going to give you exact percentage size of these tokens
// but I'm going to give you a general idea on how I'm organizing my portfolio as a whole and then I'm going to give you the
// actual products within each category and this is going to be an absolutely monstrous amount of information so get
// ready smash that like button and make sure you're subscribed with the Bell notification on each video we've come
// out with over the past few weeks I've been trying to make sure that they are so loaded with information that they are
// effectively unmissable okay the first one where we started doing this was 185k
// views we're going to have our first video Hit 200k K views in what feels like years I'm sure it has been and
// every single video here I've been pouring my heart and soul into making sure that they are jam-packed with Alpa
// so make sure you put the Bell notification on because everything I put out on this channel going forward will
// be in my opinion required viewing you absolutely must watch this stuff if you
// want to be ahead of crypto no channel is covering these niches and these movements like I am and I'm giving this
// all to you for free and I'm trying to make sure that I don't waste any of your time here so hit that Bell notification
// and you will be in my opinion way ahead of everyone else but again as I go through these coins I want to be very
// clear I will explain my logic as to why I like these coins but in the end this
// community is getting so big and so many people know about the strength of this community that inevitably if you're
// following the coins here only on this list then you're always going to be late I want you to take the ideas here the
// mental models of how I'm finding and analyzing coins in this market which I explained in detail and I want you to
// apply them on your own and that way you can be ahead instead of buying a YouTuber coin like I'm going to be
// covering here it's going to allow you to get ahead of everyone else but only if you do these things and do the hard work
// on your own with that said I hope this information helps you now starting at the top we have salana okay this is a
// risk ranking and by the way you see my technicolored risk ranking chart here again this is completely made up right
// I'm just trying to give you a sense here of where the the bigger risks are uh blue chips and the medium and the medium
// highs those are just going to be lower gains there's still a ton of risk in those coins right everything has risk in
// this industry could get sued by the government founder could die you never know crazy world lot of smells Anything
// Could Happen okay but anyway enough of that salana you guys know my thesis here salana is the best competitor to ethereum and everything in the salana
// ecosystem Has Gone Bananas I started giving you guys salana in the teens in the low 20s and it has absolutely
// crushed it it peaked I think at about $75 um I'm just calling my ET call here 17 though I know I talked about it
// around the 13 range I just think I was more forceful around the $17 range and so the gains so far are 321 per or 4.21
// x's and the downside and this is how I'm calculating this the downside is the
// 2023 low so the low value in 2023 I don't think the market goes and revisits
// those I think that's a hard bottom and so my logic is your downside in this category is effectively the current
// value and that is divided by the or the the 2023 low divided by the current
// value and that allows you to see effectively how low you could go if we revisit those lows which is possible
// right if there's some apocalyptic scenario and Bitcoin just shreds through 32k and everything turns out to be a
// massive bull trap and kappo was right well I guess this is possible right we could go revisit those 2023 lows so I'm
// just showing you your max downside but just know essentially salana has taken on this super Blue Chip status as a
// testament to that projects like gito which are essentially like Lio or Flash Bots in the salana ecosystem are being
// valued at multi-billion dollars that's $3 billion fdv for a project like jeto
// which arguably might be seen as too much too soon but it just shows you how significant the salana ecosystem is that
// people are valuing uh the coins in the salana ecosystem as equal to their ethereum counterparts and that's a
// massive narrative so like I said I'll be rotating profits from trades into salana as part of my strategy and that is one
// that I keep getting laughed at in the YouTube comments so if you want to keep laughing at me go ahead I appreciate it
// every time I've been laughed at and mocked for my choices that I'm making publicly here for you all it's turned
// out to be a massive Money Maker so reply guys eat your heart out because you are my best indicator that I'm doing
// something right I know it's a hard pill to swallow but we have a lot of coins to get through so we are going to start getting through them the second one is
// chain link again chain link is one of the most important protocols in the entire space they're integrating with
// swift that's right the banking Swift they are one of the most legitimate ways to communicate between chains and
// protocols if you have dexes that are feeding in prices well they're using an Oracle and that is coming in through
// chain link chain link is effectively part of most if not all of Defi and it
// is a blue chip by all standards again Blue Chips they have a potential for maybe a 10x or so from here maybe a 15x
// in a very good situation but they're also lower risk they're not going to dump as fast they have much more
// significant holder bases and chain link is definitely a blue Blue Chip to have on your radar it's part of my portfolio
// and if you want a more passive portfolio things like salana and chain link are definitely in that lower crypto risk
// almost guaranteed to be here for the next several years if not on into the future next we have coinbase as you know
// I'm a big bull on coinbase stock after the fall of CZ and FTX they are the last
// man standing and they are the white knight of crypto publicly listed on the stock market I've been aping coinbase
// like a madman since about $60 here $65 is when I covered it on the channel and
// that would mean that we're about 2.1x over my call and I keep adding to my coinbase position just cuz it's really
// easy to do for my bank I have sort of my Fiat and crypto worlds separated and it's a really nice easy thing to do that
// I've been rotating out of my treasury bills and into coinbase stock largely from my treasury bills and it's been an
// insane play I also think coinbase is a blue chip in that it's not going to do more than a 10x here in fact if it hits
// $1,000 I would be kind of mind blown I think that that's possible in like a total blowoff top but really I'm just
// hoping it makes new highs around $500 to $1,000 at the end of the cycle in 20125
// that would be a blessing and I think that that is a peak price for coinbase this is the only stock you're going to
// see here but it trades like a crypto so of course if you want something more passive these are things you can just buy and know they're going to be here
// years from now and probably going to grow with the cycle now we get into something a little more spicy which is Avalanche as you guys know I've been a
// big Avalanche bull throughout the years I was first on avax in 2021 one I was
// one of the first YouTubers to bring avax and the avax ecosystem coins like Joe and some other Crazy Ones to the frame
// here Joe's like the Unis swap of avalanche again Avalanche is to me the next in line after salana as far as
// hyped layer one ecosystems and it is slightly off of Blue Chip it's not a blue chip it's a medium risk and just to
// show you here it's been tracking actually the gains of salana really really well if you look here soul is
// about 73% off its high Avalanche through most of the markets about 74% off its
// alltime high it was almost identical in its percent draw down from alltime high for the entirety of the bare market and
// so these two will probably make their way up to alltime high in a similar fashion and if you really study the
// actual movements Avalanche is a really interesting evm Tech again the layer one ecosystem has a ton of competition there
// are so many chains now but I just think there's some muscle memory in the charts here because Solana Luna and avax were
// like the trio of 2021 obviously Luna nuked and doesn't really exist anymore but salana and avac when salana makes a
// really big run avac seems to want to play catchup and look what is a medium risk goated L1 if you don't have polygon
// now polygon markets itself as a layer two but it really kind of in practice is a layer one though they are starting to
// connect the dots here with their cdk right so they have this chain development kit where they effectively
// allow people to launch their own ZK EVMS now this is very next gen and it's in fact the technology that underpins the
// newest initiative from immutable X which is of course also on this list and a project that we'll talk about shortly
// but together this is part of the three-headed dragon of gaming and polygon is beyond that it's also really
// good Tech and I know this from my developer friends which throughout 2021 really didn't like the technology that
// underpinned polygon they've made big strides and in my opinion their ZK Tech has started to become best-in-class and
// really next gen so it's something to consider that polygon and their technology keeps evolving and they're
// about to evolve from the madic token to the pole token again showing their firm transition to
// ZK rollup technology this is something to keep your eyes on and I have no reason to believe that polygon won't
// have a massive run in 2024 with the rest of the market again this thing went on 300X it was trading between 1 and 5
// cents when I was covering it like crazy in 2019 and 2020 and in 2021 it went on
// its hallowed run up to $3 it's pretty insane next one up is injective and in
// this case you want to trust the strength of the chart look at this this is one of the best performing assets of the entire
// market and one of the few that has actually broken its prior all-time high you can see its prior alltime high was
// about 24 bucks here and today it is sitting at $26 this is the way that you
// understand that strength begets strength and obviously we've talked about injective in fact we were one of the
// first people to cover injective at the beginning of the 2021 run at the end of 2020 we covered injective at 70 I
// actually participated in the early token sale and was able to get tokens at 70
// here and we rode this thing up as a community up to $22 absolutely astronomical but look it takes a very
// special type of team to be one of the first to overcome your prior highs in the new cycle and this chart is screaming that it wants to remain strong
// so again injective is a defi protocol is part of the cosmos ecosystem and you'd be a fool to fade this kind of strength
// in a new cycle next we have Celestia now Celestia is like a nerds Paradise again
// in the cosmos ecosystem both of these are they are their own layer ones and again I put them as medium high because
// they are newer Kids on the Block they are not as established as Avalanche they are not as established as polygon they do not have as many fundamentals driving
// them in fact Celestia's brand new and trading like an absolute beast but at the same time I think Celestia's Tech is
// very exciting to people and the strength of its chart simply cannot be denied I mean essentially it doesn't really know
// how to take a dip it's absolutely crazy obviously we talked about it here at about four bucks I had people talking to
// me about it at $2 but I missed that move and as you you can see the strength is just undeniable even when Bitcoin had
// this dip it just exploded upwards it shows you that there's true demand here for Celestia some additional Alpha here
// is that I'm hearing that there's going to be a ton of Celestia airdrops so if you're staking Celestia you'll get a ton
// of these projects that are launching on Celestia essentially giving you free tokens air drops so if you're staking the Tia coin then you could be eligible
// for some aird drops again this is all early Alpha but in addition they have a 16% APR so you stake you get some
// Celestial rewards and then you get some free tokens on top of it if this thing moons like crazy it could be one of the
// gigabrain plays of the cycle I'm certainly hoping it is now the last one is internet computer and what's crazy
// about this chart is I don't think I've seen a worst looking chart in my whole life like it is easily the worst looking
// chart of all charts however that is actually kind of a benefit when you zoom in you realize that almost all their
// tokens are in market right they have a total supply of 510 they have 450 circulating that's like I don't know 80
// or 90% there and so there's not a lot of inflation and this thing went through this crazy crazy dump where effectively
// everyone got mad and sold and its reputation went down but meanwhile they kept developing stuff and it's got this
// decentralized storage play that I actually think makes it slightly different than other layer ones it's not
// directly competing with the likes of soul and stuff who knows anyway I have some internet computer in my portfolio
// cuz I think there's a chance and if you see here it hasn't pumped very much its low was like three bucks it's up at like 5.6 it's not even 2x off its lows and
// get this the all time high was $700 right it's sitting here at $5
// that's literally more than 100x it's n it's over 99% down from its all-time high so if it does go back and tickle
// its all-time high which I think of as absolutely absurd it probably won't do that well it's just like there's just a
// lot of room for this thing to go that these are the charts that if they get going could mean business if they get
// serious again I have a very small amount of my portfolio but I figured it was worth a bet in case this thing does wake
// up next there's a project called monad it is not released yet it's in my uh unreleased and I just gave it a risk
// because I don't really know what the risk is cuz I don't know what the price is risk is heavily correlated to price
// if you don't know what the price is you can't determine the risk but anyway this is an upand cominging project that a lot
// of people are hyped about and I would not be shocked if this thing ends up catching some serious hype waves if we
// do get this bull run that we're all really hoping for this is one to have on your list definitely go ahead and follow
// it the next is layer zero again this is going to be one of the biggest coins in the the whole ecosystem and you can
// actually likely qualify for their airdrop if you're using their Stargate Finance defi application which allows
// you to bridge assets between different chains I highly encourage you to understand what layer zero is as this is
// likely to be one of the biggest token launches in the whole industry coming up soon shout out to the layer zero team because I've actually been collaborating
// with them on some other stuff again stuff that will be announced in 2024 now I want to be clear those are like the
// big coins those are the big pieces of tech out here that I want you to be aware of and most of those are lowerer
// risk and we'll have most likely pretty muted rewards we're not talking about 100 X's here like if Celestia goes 100x
// it would be worth like a quad zillion dollars that's not going to happen those are maybe 10 to 20x plays at the max but
// probably some of them will be closer to 5x plays in my opinion having too much of your crypto portfolio tied up in 5x
// plays feels like a waste that's my particular approach and to explain this in a little more depth I'm breaking out
// my portfolio breakdown which is in the end I have a lot of money in Treasures which I'm actually rotating quite a bit
// of money out of there because I believe interest rates have peaked and that risk is going to be the new thing to allocate
// towards that's my particular approach but in the end I have what's called a crypto barbell where on one side of the barbell I have lower risk stuff stuff I
// know is going to be there for a very long time stuff like Bitcoin stuff like coinbase stock stuff that I don't need
// to wake up in the middle of the night sweating and think has it all gone to zero has it all just evaporated into
// dust yeah yes this is the high conviction long-term bucket and in that high conviction long-term bucket we have
// Bitcoin we have ethereum we have salana and we have coinbase stock and that bucket actually has been updated because
// coinbase has been ripping salana has been absolutely ripping and this is how my long-term conviction bucket looks now
// I'm actually rotating profits whenever I do take them into salana that's my personal approach again I might rotate
// profits into some other exotic L1 if I get really carried away but this is my general plan I'm going to try to stick
// to my plan as much as I can it's also really important to make plans and write them down because the emotion of the market will carry you off into La La
// Land if you let it and if you write stuff down you can at least sober up for a second and pull yourself out of the
// Psychedelic Bull Run acid trip that has long since left planet Earth and you're
// contemplating whether a dogcoin on butthole chain can be worth $10 trillion because you saw a tick tocker made a Tik
// Tock about it and you're just wondering what the point of life is because you haven't talked to your friends in months
// and you stare at a screen all day trading crypto coins that's what the bull Run's like all right you lose your godamn marbles so keep it together all
// right keep it together and write stuff down all right a little break from the video here because if you're new to crypto you need to have a VPN and that's
// why I'm extremely proud to partner with nordvpn and be one of their leading Partners in the whole crypto space
// because if you don't have a VPN you're literally like a lamb to the slaughter here your IP address will start showing
// up on crypto sites which even though the blockchain is secure those sites could be compromised and your IP address
// effectively you could become a Target so you want to make sure that you avoid that situation with a product that only
// cost $3 per month but what's great is you get a massive discount if you use my link below again I was hacked a few
// months ago and so I take cyber security extremely seriously like I've said many
// times before you can be forgiven for a lot of mistakes in crypto a lot of them are understandable in fact even ogs make
// mistakes but one thing you will not be forgiven for is not having a VP VN it's so cheap it's so easy and best of all it
// supports the channel and I appreciate you guys so check out nordvpn sponsor of today's video and let's get back to some
// good old fashion cryptocoins back to the point here I personally think that the zero Infinity bucket is worth allocating
// to now I personally think the zero Infinity bucket has odds that in a bull run make sense because in a bull run if
// Bitcoin continues to grow usually altcoins will continue to grow especially early on in the bull run and
// quite Frank Al the risk if Bitcoin doesn't continue to grow is it could drop dramatically I mean bitcoin's up 3x
// on the year so I mean the thing could drop like 70% and still only be touching
// its 2023 low that my friends is a huge amount of downside but if you're upside
// is you know somewhat limited compared to the 100x opportunities out there and those 100x opportunities are likely to
// hold and grow if Bitcoin holds and grows then to me the crazy Bull Run logic is
// you want to be allocated in some way to these altcoins the zero Infinity bucket knowing that it goes to zero or the damn
// Moon and you're comfortable with the odds of it doing one or the other and you're ready for either outcome that's
// where I'm at again make your own decisions I have enough fiat currency I have enough cash in my world that if my
// crypto goes to zero I'll keep eating I'll keep surviving and my life won't be changed obviously it would suck ass but
// I would still continue to live and survive and pay rent a lot of people aren't in that same boat so you have to
// make the decisions based on your own Financial decisions I'm not going to be there to pay your rent or to feed your
// kids if you can't do it you got to take care of your own period okay so let's get to the fun stuff okay beam
// Merit Circle again they were called Merit Circle I covered them at about 40 cents and they've shot up here to what
// was the equivalent of $2 but when they did a 1 to 100 split on beam now the price is reflected you can think of this
// as 0.0043 or something like that so they've done about a 4.4x since I covered them absolutely smoking those
// gains and they are one of the most important coins in the crypto gaming space they have a ton of Investments
// they have a treasury of nearly $100 million they are actively invested in some of the best games in the space and
// they are now partnered with immutable X to bring some cool technology to the immutable X ZK evm speaking of immutable
// X they are also on this list as you know I an immutable X seed investor I'm a massive investor in beam and I have huge
// huge bags of both of these tokens and I am so happy to see them climbing the ranks with absolutely Reckless abandon
// here and I have no reason to doubt that they will continue to grow as gaming continues to grow my hope is that
// immutable X becomes the first gaming token to crack the top 10 in crypto market caps and just for some
// perspective here it's at $2.6 billion market cap the top 10 is 13 here so it
// would have to five or 6 x from here to overcome the Doge and to me that would
// have to do that you know against the market so this would take take a massive gaming run but I don't think it's insane
// I think it might happen here and if it does happen then that might mean that beam becomes a top 25 coin or something
// like that again understanding that crypto is about categories niches storylines and if one coin from a
// category makes it astronomically High the entire category will reprice under it so the higher immutable goes that
// creates a higher ceiling for the rest of the gaming ecosystem to flourish in so as a massive gaming bull I'm very
// excited that immutable X is continuing to crush on the way up and that to me paves the way it blazes a trail for all
// of gaming to repic under it so as you see a mutable X make this massive run know that it's bullish for all of gaming
// that's the facts Gala as we've said they are a publisher they have several games and they had a massive destructive run
// down from their all-time high their all-time high was like 70 cents they're currently at three here so on their way
// back up if they are to make it back up could do astronomical gains again their downside is about 60% % they haven't
// pumped too hard here as you can see these other ones have pumped much harder they're up much more significantly but
// about 2.1x since we called it here on the channel Ronin again similar to Gala
// they have some games far less games here like immutable has like hundreds of games that are coming to the immutable
// xchain but Ronin has axi Infinity which was the most successful crypto game of all time and they also have now pixels
// online which has 400,000 active users now the thing about the Ronin ecosystem is it caters largely they have a huge
// fill Lino player base and so there's a lot of emerging economy Dynamics going on there but it is a very interesting
// and totally unique way to approach gaming and again there's a lot of different approaches here I'm not
// playing gatekeeper I'm just saying here's all the pieces and as you can see Ronin has performed pretty well of about
// 3.4x since we covered on the channel and that has a lot I think to do with pixels online which is this game that has a ton
// of active users right now again very few games on Ronin there's a few games on Gala there's quite a few games that are
// connected with beam actually launching on it subnet as well as dozens and dozens of Investments by the Merit
// Circle Dow and then you have a mutable X which is kind of like the big daddy gaming coin which we hope hope breaks
// into the top 10 next we have cify as you know cify is a Launchpad these launchpads as the market gets super hot
// again if we are to get this Raging Bull Market launchpads will go bananas they will go absolutely crazy because they
// will give you early access to tokens before they hit the market and token launches in a bull market can go
// absolutely dummy High I'm talking 10 20 50 100x 200x and more in the peak heat
// of the bull market and so if you get into the launch pads you can actually buy allocations to these new projects
// sometimes just 500 bucks sometimes a few thousand doll but if things go 20x 50x
// and you instantly have those tokens you can flip and make 20K 50k sometimes even
// more in single days and that is the magic of launchpads but it only works during Peak bowl season so again cify is
// kind of the leading gaming Launchpad I have a ton of cify tokens I cover them first at 60 cents here and so you're
// looking at almost a 6X since I covered them again you are welcome team elot
// trades if you guys have been rocking with the channel here in 2023 you know this has been probably the best content
// streak I've ever been on and I only intend to keep pushing harder because getting bullish early in the cycle is
// lower risk whereas getting bullish at the ultimate Peak is the higher risk and I personally hope I can get the most
// amount of people excited about this Market at an early stage when most coins are probably going to do well as opposed
// to at the end of a cycle when most coins are set up to absolutely implode that is
// the best way to do it and I hope this content helps the maximum amount of people but again it's not a team sport
// here you all got to understand it is you and you alone out there in the crypto markets once you choose to buy some
// coins next we got Prime again this is one of the most legit trading card games here in the space you have a $119 2023
// low and uh their their current value is almost 9 bucks these guys are backed by a16z they're super duper legit and in my
// opinion this could be one of the highest performing gaming tokens of the cycle I'm definitely a big fan of what they're
// doing here and I hope hope they continue to crush it as you can see their fully diluted valuation here is almost a
// billion so they only have you know small amount of their token circulating like less than 30% of their token circulating
// so it really is a tiny uh circulating Market market cap and there will be token emissions here something to
// consider but they are one of the most advanced ecosystems and they definitely deserve a slot in anyone's gaming portfolio once again my philosophy on
// gaming is that it will eventually create mainstream hits the industry will continue to have some of the most
// attention and excitement surrounding it and when anything succeeds in gaming the rest of the tokens will get a lot of
// love so that's why I'm hyperfocused on gaming because as a niche I'm convinced it's going to succeed and its success
// will mean that focusing and distributing my bets within that niche in my opinion are most likely to succeed next we have
// neotokyo now this is a project that is mine obviously there are three projects here that I have founded and I cannot
// comment on for that reason I cannot tell you how risky they are or talk about prices or anything like that as a
// Founder but what I can tell you is that neotokyo has almost certainly fulfilled its highest aspiration of becoming the
// crypto gaming Illuminati the networking Club where the power Brokers of crypto gaming come to intermingle to share
// knowledge to build to launch stuff and that's why tons of projects want to actually launch to the neotokyo holders
// in this case immutable immutable X has recently joined literally every gaming project here is a part of neotokyo
// almost and it is very much so the place to be if you are a power broker in crypto gaming community members have
// created all kinds of projects one Community member actually created a Launchpad again this is not owned or
// controlled in any way by neotokyo or me or Becker but like cify someone created a Launchpad so that citizens could get
// access to projects before they launch and projects often times choose to want to come to neotokyo because they want
// these holders these Diamond hands these power Brokers to be a part of their projects and that's why neotokyo has
// been so successful is it is an absolutely phenomenal experiment that has succeeded in every way of becoming
// the networking Club of web 3 gaming now imposters is the game of the superverse now I do want to be very clear the best
// advice I can give you is to go put the Bell notification on for superverse just like this make sure that it's turned on
// because superverse will be shedding its skin and revealing an entirely new phase of the project that is very much so the
// connecting fiber between everything that you see in front of you in the crypto gaming space there is no doubt that this
// community is the biggest and most powerful in the crypto gaming space I've been spreading the good word about
// crypto gaming since 2018 I don't want to ruin this reveal because we've been working really hard on it but all I can
// say is turn post notifications on on superverse and understand that as hard as you see me working on content as much
// as you see me getting ahead of these Trends in the industry year after year week after week month after month year
// after year cycle after cycle I'm putting far more effort orders of magnitude more into these projects and you'll soon see
// the fruits of those labors now to be clear imposters is currently an nft form and the studio behind Impostors has
// recently hired an absolute legend in the form of Rick Ellis I highly encourage you to watch this interview where Rick
// Ellis list the new head of imposters actually explains why he's so bullish on web 3 gaming and his plan to take
// imposters mainstream again these projects are my primary focus and if you believe in what I'm doing then all I ask
// you to do is turn your notifications on for those projects because there is a lot coming in 2024 that you cannot see
// and if I'm right about this crypto cycle being the one which crypto gaming breaks through to the mainstream well there's a
// whole lot in store for these projects that you can't even imagine next this is actually the first project that I'm going to put on here that's unreleased
// this is called terse and when it comes to unreleased projects I want to be completely clear the hype before the release is totally damaging to the
// project and you do not if you're not one of the early investors you do not want to be buying these projects right out of
// the gate almost all new token projects during the Bull Run come out at astronomical prices they tend to pump
// and dump and you want to kind of stay away from them until they dump like crazy but again that depends on when
// they come out and when the tokens release but I will for your understanding just put these on your radar and I'm not going to talk too much
// about them cuz I don't want to create any artificial hype about them but I just want you to know that these are projects that are coming next year that
// I think are ones you should be researching and understanding token launches are very very tumultuous and
// you should definitely be careful when you get into any new token and understand the 360 view R rever gonzilla
// ready games pixels online and I'll also add in Heroes of mavia here again these are all super highquality gaming
// projects I've invested into most of them not all of them and again I'll follow up with more information when the time is
// relevant but I'm making a 2024 video I want you guys to know what I'm thinking about for 2024 next we have shrapnel
// shrapnel is one of the hottest gaming tokens they have one of the sickest looking games they're competing in the
// Big Show which is firstperson Shooters they have their own subnet on Avalanche I certainly certainly hope that they
// succeed in their mission again any game succeeding is good for all of the games and I'm very hyped on what they're doing
// definitely part of my 20124 portfolio next big time again I never put calls on trapal big time so I just have na here
// but again big time and trapnel are two of the best looking games in the industry right now big time is one that
// is very interesting because if you're actually farming within the game you can play an MMO RPG and players are making
// up to six figures over the last few months farming their big time tokens it is something that probably won't last
// forever so if you're looking to spend some time and grind a game and maybe end up earning some crazy amounts of tokens
// I highly suggest you check out big time and of course we have cus again I've covered cus in depth they're adding a
// LaunchPad had they burnt a ton of their supply they have tons of games in their ecosystem and they are up almost 10 full
// X's since we covered them here on the channel absolutely Smokey no jokey gains
// here out of cus their goal is to focus on browser gameplay totally democratized
// no fancy chips required and they believe that the Casual gaming route is the way to onboard billions of users again
// everyone has their own strategy some games are going for immersive AAA like you're seeing with gonzilla like you're
// seeing with shrapnel like you're seeing with eluvium another one that's on my list for 2024 I don't know why it's not
// here some are going for more casual games like cus mobile games like maavia or wagi and then you also have more
// economic games like you saw out of axi Infiniti and you're seeing the same thing out of pixels online next I'm just
// going to be real this risk rating again the risk rating for all the ones in yellow is high that means you know you
// could have a 20 to 50x but you could see a 90% correction this is big big risk
// right the medium highs you're seeing maybe a 15x or an 80% correction medium you have a 75% correction and a 12x you
// just have to understand the risk scale here and again this is not very sciency I just literally pulled these numbers
// out again this is like astrology for men here embrace it we're just looking to the stars but we're hoping that we get
// something right I've caught a lot right over the years it doesn't mean that I have special powers okay I'm just a dude
// with a webcam and this bright light and a neon sign and a pudgy penguin toy okay speaking of the memes I told you I only
// have two meme positions that is Pepe and Bon and since I said that Bon has gone on such a ripper it's up 3.1 6X and
// rumor has it it's going to get listed on coinbase again this is proof that the salana ecosystem is absolutely on fire
// okay absolutely on fire heepe I still think is the Daner meme by so many orders of magnitudes hoping that the
// Frog gets its legs under it and has like a Dogecoin moment at some point in the future I don't know I could be wrong
// it's still up a bit here from where I called it only 37% not crazy here but it's up right it's up we don't turn our
// noses up at gains here not after a three-year bare Market we do not turn our noses up at gains even small gains
// now the other thing that is a strategy here and this is so degenerate this is seek medical help degenerate this is you
// need to see a doctor okay you need to see a doctor if you're doing this there's something wrong with you but if
// you do want this level of 100x 200x gains from buying literal abysmal meme coins then what you want to do is look
// for the alternate l1s like Avalanche like Cosmos ecosystem chains and you want to see when they create their
// leading meme coins if you're early to those you could maybe ride on a real rocket ride here and so that's the dgen
// next level stuff is buying meme coins that are not goated like Pepe and Bon those ones are so absurdly risky it's
// not even worth discussing here you really you really just need help you need help you need Jesus next we have the AI Niche and I'm telling you guys my
// main focus here is aosh I have my own validator on aosh so you can delegate to it it's called ELO trades new go ahead
// and delegate towards it I think AOS is doing something that almost nobody is they're allowing for subletting of GPU
// power again AI will continue to make massive news throughout this cycle every few months there's a new AI explosion of
// interest and excitement and drama that will continue driving crazy amounts of attention excitement and investment into
// AI cryptocoins that means that things like AOS which allow you to lease computing power which is the driver of
// AI right now compute power is what this is all about things like aosh will potentially become massive massive
// focuses going forward there's also a bit tensor that's kind of like the leading one I don't have a big bag of it because it literally doesn't know how to dip
// it's just been going absolutely bananas it literally will not dip but I do think that if cool apps start launching on top
// of benser the tow token that could be something to look for again aosh is
// something I've been holding for years I believe they'll continue to crush it and if I were to say so it's my favorite AI
// coin I don't have a ton of AI coins but I do believe Ai and gaming will be the driving narratives of this bull run
// onward if you're looking for a little something extra there's dexes like dydx okay I could see Americans getting
// frustrated not having access to Futures Trading because none of the exchanges let Americans on anymore so
// decentralized Futures like dydx could become interesting again it doesn't pump very hard but I think their new version
// of their protocol which shares fees is quite interesting for me the nft play besides obviously neotokyo and imposters
// the nft play that is most likely to pull a board ape this cycle is pudgy penguins and that's because lucanet the CEO is an
// absolute Beast I'm a friend of his and I think his vision is going to take him somewhere crazy so if there's a next nft
// that is pudgy Penguins you're looking at to me the only thing I see as a pfp project that could hit 100 eth plus I
// think pudgy Penguins would be that crazy one again they've traded as low as 4 eth this year they're up quite a bit but
// they just keep delivering and they recently previewed this pudgy World concept which to me screams that they're
// making a video game and that they will transition from being a consumer packaged Goods project to being a video
// game project which to me is giga bullish cuz gaming to me is the thing I believe in the most most next if we're talking
// about ways that you can enhance your 2024 portfolio you're going to want to look at rotations this is when certain
// ecosystems like salana Ava Cosmos whenever they get hot you'll see the coins within those ecosystems get hot
// again I don't know what those coins are I'm not bringing attention to any of them in specific but let's just say you didn't want to do gaming for some reason
// or you didn't want to do AI you wanted to play in specific ecosystems this is one way to do it I'll end here with
// finally two D5 plays one of which I was an early investor into called Prisma I personally think Prisma will have a
// really nice future again I'm an early investor I plan to hold those tokens for a significant amount of time and see how
// the project performs it's still pretty under the radar as well this is in the liquid staking token narrative where you
// can stake your stake eth and get additional yield on top very interesting project as well as Rune which allows you
// to do onchain swaps between things like ethereum and Bitcoin I think Rune is kind of in its own category so Prisma
// and Rune are the two that I like for defi if I was to pick a defi coin okay
// this Raw video file is now almost an hour and 10 minutes if you guys feel like I delivered a tremendous amount of
// value for this 2024 portfolio overview the way I've gone through and explained why I'm in each one of these coins the
// risk involved the upside the downside the left side the right side then smash that like button and make sure you subscribe with that Bell notification on
// I believe that this is going to be one of the most incredible Cycles we've ever seen but of course there is a risk it doesn't play out if it does however I'm
// confident that gaming will be the most transformative place to be and I'm excited to continue to show you the light throughout this journey if I
// missed your favorite token you know what to do leave me a comment in the comment section below if you enjoyed this video check out this one that I made just a
// few days ago which goes even into more detail on some alt coins that I love as always I'm elot trades and I'll see you
// very soon on the next
// episode
//  `,
//   });
// console.log(
//   ` Transcript: ${transcript} \n Usage: ${usage} \n Entities: ${JSON.stringify(
//     entities
//   )} `
// );

/* console.log(
  await getEntitiesNer({
    transcript: `while things are macro going down you want to sell them as they rally up cuz that's your chance to get out at a good 
price now I wanted to add in here that Bitcoin is now in a dip and the whole Market has pretty much taken a massive 
dip well not every coin of course beam and immutable X are still crushing it but you you know most of the coins here 
have taken a bit of a dip there's plenty of coins in the red here over the last few days and honestly it's kind of 
popping up right now so you know it's at 42,
    000 if it gets back above this you know $43,
    000 Mark or so you know if it 
gets back Above This 425 or specifically above 43 44 this dip is over right this 
is going to to new highs for the year what I want to impress upon you is this dips are effectively the thing that you 
want you don't want to just be chasing when things are up up and away that might feel like the best time to invest 
it certainly is the most exciting but what you really want to wait for are the times that it's not exciting again so if 
this dip gets worse goes down into the 30s or so maybe even the low3s that would not be the end of times now it 
would be very concerning if we go below you know 31,
    000 or 32,
    000 that is a very 
sensitive area and might signal a much more difficult time for Bitcoin ahead 
really all of crypto but in the case of right now anything above 32,
    000 to me is 
a massive massive opportunity if it comes down and the more uncomfortable it gets the more the Bears come out of 
their caves and start screaming it was all a dream this was the biggest bull trap in the history of the world well 
that to me my friends is the time that all be looking to smash the buy button but again I'm not doing too much right 
now I've been buying throughout 2023 and so I'm pretty well positioned here coming into 2024 but I hope this video 
helps you out a lot and back to the analysis so the point is right now we are still in this three candle which is 
right before the two most parabolic years the two best years of the Bitcoin cycle that is if the cycle is to 
continue to play out the way it worked before now a lot of people don't believe in this cycle stuff but get this you 
want to see something crazy from the all-time low in 2015 to the all-time high in 2017 it was exactly 
1,
    64 days from the all-time high in 2017 to the all-time low in 2018 it was 
exactly 364 days from all-time low in 2018 to alltime high in 2021 1,
    64 days 
again exactly the time from low to high and then once again from all-time high 
in November of 2021 to alltime low in November of 2022 
364 days honestly some things are Stranger Than Fiction and Bitcoin very 
well might be one of those maybe we're all in a simulation maybe this is all some collective delusion maybe there are 
no coins at all what I do know is that as long as this Bitcoin cycle continues to show itself and prove itself out as 
it has once again in 2023 I feel like I would be a damn fool not to bet hard on 
the industry that I log into and talk about and obsess over every single day so that's what I'm doing but make no 
mistake this is risky business and everything you buy into could be manipulated crash the founders could end 
up not being honorable or doing the right thing the code could get hacked stuff is very very risky and you assume 
a 70 to 100% loss whenever you buy anything in this crypto space the 
trade-off here is you're trading a 70% downside for a potential thousand or 
10,
    000% upside that's 10 to 100x upside versus a near total loss those are 
better odds than you're going to get in Vegas almost any day of the week and for that reason I'm all in on crypto gambling to make my life better and if 
you're here in crypto right now watching a video like this you need to slam down some hard to swallow pills and 
understand that you're gambling too well to be fair we all need to gamble that's what the Fiat system forces us to do cuz 
your money turns to dust in your wallet your labor is not worth anything anymore we need to gamble in stocks in real 
estate in assets of some kind if you want to get ahead and to me crypto is the one that I know and it's the one 
that I think is the most generous and most likely to help people Achieve Financial Freedom so I'm gambling here 
and with that said let's get to my portfolio for 2024 of course we should add that Michael sailor the biggest bull 
on Wall Street believes Bitcoin will hit a $350,
    000 price in 2024 now that would 
mean that Bitcoin is about 10x from here of course what we saw over the last one 
was Bitcoin went about 3x over its prior all-time high now if Bitcoin goes to 350k that would mean it would do a 5x 
over its prior all-time high whereas last cycle it did about a 3 and 1/2x over its prior alltime high so it's 
going way higher and that would mean that what we'd see out of total three meaning the altcoins would probably be 
even more dramatic right we saw a gain here of total three which went from about 300 billion up to 1.3 trillion 
this was about a 212% gain or almost a 3X out of the altcoins now if we go 50% 
more that means we could see about a 4X out of the altcoins from prior all-time high and that would mean altcoins alone 
would be at $4.5 trillion doll not to mention you add in Bitcoin and eth you have crypto scratching its head on 
nearly $1 trillion in market value that my friends is the size of gold and that 
my friends is a whole new ball game as they would say and as always I solicited the community I said I'm doing my 2024 
portfolio video this week what coins should I include and I literally in a few hours got almost 1,
    000 responses and 
they were really bad they were terrible I am not taking advice from you guys ever again I don't know what you're trying to do to me but please God stop 
trying to give me Alpha because it is not working anyway back to the show all right let's get into it this is going to 
be a complete breakdown of the 2024 portfolio and I'm not going to give you exact percentage size of these tokens 
but I'm going to give you a general idea on how I'm organizing my portfolio as a whole and then I'm going to give you the 
actual products within each category and this is going to be an absolutely monstrous amount of information so get 
ready smash that like button and make sure you're subscribed with the Bell notification on each video we've come 
out with over the past few weeks I've been trying to make sure that they are so loaded with information that they are 
effectively unmissable okay the first one where we started doing this was 185k 
views we're going to have our first video Hit 200k K views in what feels like years I'm sure it has been and 
every single video here I've been pouring my heart and soul into making sure that they are jam-packed with Alpa 
so make sure you put the Bell notification on because everything I put out on this channel going forward will 
be in my opinion required viewing you absolutely must watch this stuff if you 
want to be ahead of crypto no channel is covering these niches and these movements like I am and I'm giving this 
all to you for free and I'm trying to make sure that I don't waste any of your time here so hit that Bell notification 
and you will be in my opinion way ahead of everyone else but again as I go through these coins I want to be very 
clear I will explain my logic as to why I like these coins but in the end this 
community is getting so big and so many people know about the strength of this community that inevitably if you're 
following the coins here only on this list then you're always going to be late I want you to take the ideas here the 
mental models of how I'm finding and analyzing coins in this market which I explained in detail and I want you to 
apply them on your own and that way you can be ahead instead of buying a YouTuber coin like I'm going to be 
covering here it's going to allow you to get ahead of everyone else but only if you do these things and do the hard work 
on your own with that said I hope this information helps you now starting at the top we have salana okay this is a 
risk ranking and by the way you see my technicolored risk ranking chart here again this is completely made up right 
I'm just trying to give you a sense here of where the the bigger risks are uh blue chips and the medium and the medium 
highs those are just going to be lower gains there's still a ton of risk in those coins right everything has risk in 
this industry could get sued by the government founder could die you never know crazy world lot of smells Anything 
Could Happen okay but anyway enough of that salana you guys know my thesis here salana is the best competitor to ethereum and everything in the salana 
ecosystem Has Gone Bananas I started giving you guys salana in the teens in the low 20s and it has absolutely 
crushed it it peaked I think at about $75 um I'm just calling my ET call here 17 though I know I talked about it 
around the 13 range I just think I was more forceful around the $17 range and so the gains so far are 321 per or 4.21 
x's and the downside and this is how I'm calculating this the downside is the 
2023 low so the low value in 2023 I don't think the market goes and revisits 
those I think that's a hard bottom and so my logic is your downside in this category is effectively the current 
value and that is divided by the or the the 2023 low divided by the current 
value and that allows you to see effectively how low you could go if we revisit those lows which is possible 
right if there's some apocalyptic scenario and Bitcoin just shreds through 32k and everything turns out to be a 
massive bull trap and kappo was right well I guess this is possible right we could go revisit those 2023 lows so I'm 
just showing you your max downside but just know essentially salana has taken on this super Blue Chip status as a 
testament to that projects like gito which are essentially like Lio or Flash Bots in the salana ecosystem are being 
valued at multi-billion dollars that's $3 billion fdv for a project like jeto 
which arguably might be seen as too much too soon but it just shows you how significant the salana ecosystem is that 
people are valuing uh the coins in the salana ecosystem as equal to their ethereum counterparts and that's a 
massive narrative so like I said I'll be rotating profits from trades into salana as part of my strategy and that is one 
that I keep getting laughed at in the YouTube comments so if you want to keep laughing at me go ahead I appreciate it 
every time I've been laughed at and mocked for my choices that I'm making publicly here for you all it's turned 
out to be a massive Money Maker so reply guys eat your heart out because you are my best indicator that I'm doing 
something right I know it's a hard pill to swallow but we have a lot of coins to get through so we are going to start getting through them the second one is 
chain link again chain link is one of the most important protocols in the entire space they're integrating with 
swift that's right the banking Swift they are one of the most legitimate ways to communicate between chains and 
protocols if you have dexes that are feeding in prices well they're using an Oracle and that is coming in through 
chain link chain link is effectively part of most if not all of Defi and it 
is a blue chip by all standards again Blue Chips they have a potential for maybe a 10x or so from here maybe a 15x 
in a very good situation but they're also lower risk they're not going to dump as fast they have much more 
significant holder bases and chain link is definitely a blue Blue Chip to have on your radar it's part of my portfolio 
and if you want a more passive portfolio things like salana and chain link are definitely in that lower crypto risk 
almost guaranteed to be here for the next several years if not on into the future next we have coinbase as you know 
I'm a big bull on coinbase stock after the fall of CZ and FTX they are the last 
man standing and they are the white knight of crypto publicly listed on the stock market I've been aping coinbase 
like a madman since about $60 here $65 is when I covered it on the channel and 
that would mean that we're about 2.1x over my call and I keep adding to my coinbase position just cuz it's really 
easy to do for my bank I have sort of my Fiat and crypto worlds separated and it's a really nice easy thing to do that 
I've been rotating out of my treasury bills and into coinbase stock largely from my treasury bills and it's been an 
insane play I also think coinbase is a blue chip in that it's not going to do more than a 10x here in fact if it hits 
$1,
    000 I would be kind of mind blown I think that that's possible in like a total blowoff top but really I'm just 
hoping it makes new highs around $500 to $1,
    000 at the end of the cycle in 20125 
that would be a blessing and I think that that is a peak price for coinbase this is the only stock you're going to 
see here but it trades like a crypto so of course if you want something more passive these are things you can just buy and know they're going to be here 
years from now and probably going to grow with the cycle now we get into something a little more spicy which is Avalanche as you guys know I've been a 
big Avalanche bull throughout the years I was first on avax in 2021 one I was 
one of the first YouTubers to bring avax and the avax ecosystem coins like Joe and some other Crazy Ones to the frame 
here Joe's like the Unis swap of avalanche again Avalanche is to me the next in line after salana as far as 
hyped layer one ecosystems and it is slightly off of Blue Chip it's not a blue chip it's a medium risk and just to 
show you here it's been tracking actually the gains of salana really really well if you look here soul is 
about 73% off its high Avalanche through most of the markets about 74% off its 
alltime high it was almost identical in its percent draw down from alltime high for the entirety of the bare market and 
so these two will probably make their way up to alltime high in a similar fashion and if you really study the 
actual movements Avalanche is a really interesting evm Tech again the layer one ecosystem has a ton of competition there 
are so many chains now but I just think there's some muscle memory in the charts here because Solana Luna and avax were 
like the trio of 2021 obviously Luna nuked and doesn't really exist anymore but salana and avac when salana makes a 
really big run avac seems to want to play catchup and look what is a medium risk goated L1 if you don't have polygon 
now polygon markets itself as a layer two but it really kind of in practice is a layer one though they are starting to 
connect the dots here with their cdk right so they have this chain development kit where they effectively 
allow people to launch their own ZK EVMS now this is very next gen and it's in fact the technology that underpins the 
newest initiative from immutable X which is of course also on this list and a project that we'll talk about shortly 
but together this is part of the three-headed dragon of gaming and polygon is beyond that it's also really 
good Tech and I know this from my developer friends which throughout 2021 really didn't like the technology that 
underpinned polygon they've made big strides and in my opinion their ZK Tech has started to become best-in-class and 
really next gen so it's something to consider that polygon and their technology keeps evolving and they're 
about to evolve from the madic token to the pole token again showing their firm transition to 
ZK rollup technology this is something to keep your eyes on and I have no reason to believe that polygon won't 
have a massive run in 2024 with the rest of the market again this thing went on 300X it was trading between 1 and 5 
cents when I was covering it like crazy in 2019 and 2020 and in 2021 it went on 
its hallowed run up to $3 it's pretty insane next one up is injective and in 
this case you want to trust the strength of the chart look at this this is one of the best performing assets of the entire 
market and one of the few that has actually broken its prior all-time high you can see its prior alltime high was 
about 24 bucks here and today it is sitting at $26 this is the way that you 
understand that strength begets strength and obviously we've talked about injective in fact we were one of the 
first people to cover injective at the beginning of the 2021 run at the end of 2020 we covered injective at 70 I 
actually participated in the early token sale and was able to get tokens at 70 
here and we rode this thing up as a community up to $22 absolutely astronomical but look it takes a very 
special type of team to be one of the first to overcome your prior highs in the new cycle and this chart is screaming that it wants to remain strong 
so again injective is a defi protocol is part of the cosmos ecosystem and you'd be a fool to fade this kind of strength 
in a new cycle next we have Celestia now Celestia is like a nerds Paradise again 
in the cosmos ecosystem both of these are they are their own layer ones and again I put them as medium high because 
they are newer Kids on the Block they are not as established as Avalanche they are not as established as polygon they do not have as many fundamentals driving 
them in fact Celestia's brand new and trading like an absolute beast but at the same time I think Celestia's Tech is 
very exciting to people and the strength of its chart simply cannot be denied I mean essentially it doesn't really know 
how to take a dip it's absolutely crazy obviously we talked about it here at about four bucks I had people talking to 
me about it at $2 but I missed that move and as you you can see the strength is just undeniable even when Bitcoin had 
this dip it just exploded upwards it shows you that there's true demand here for Celestia some additional Alpha here 
is that I'm hearing that there's going to be a ton of Celestia airdrops so if you're staking Celestia you'll get a ton 
of these projects that are launching on Celestia essentially giving you free tokens air drops so if you're staking the Tia coin then you could be eligible 
for some aird drops again this is all early Alpha but in addition they have a 16% APR so you stake you get some 
Celestial rewards and then you get some free tokens on top of it if this thing moons like crazy it could be one of the 
gigabrain plays of the cycle I'm certainly hoping it is now the last one is internet computer and what's crazy 
about this chart is I don't think I've seen a worst looking chart in my whole life like it is easily the worst looking 
chart of all charts however that is actually kind of a benefit when you zoom in you realize that almost all their 
tokens are in market right they have a total supply of 510 they have 450 circulating that's like I don't know 80 
or 90% there and so there's not a lot of inflation and this thing went through this crazy crazy dump where effectively 
everyone got mad and sold and its reputation went down but meanwhile they kept developing stuff and it's got this 
decentralized storage play that I actually think makes it slightly different than other layer ones it's not 
directly competing with the likes of soul and stuff who knows anyway I have some internet computer in my portfolio 
cuz I think there's a chance and if you see here it hasn't pumped very much its low was like three bucks it's up at like 5.6 it's not even 2x off its lows and 
get this the all time high was $700 right it's sitting here at $5 
that's literally more than 100x it's n it's over 99% down from its all-time high so if it does go back and tickle 
its all-time high which I think of as absolutely absurd it probably won't do that well it's just like there's just a 
lot of room for this thing to go that these are the charts that if they get going could mean business if they get 
serious again I have a very small amount of my portfolio but I figured it was worth a bet in case this thing does wake 
up next there's a project called monad it is not released yet it's in my uh unreleased and I just gave it a risk 
because I don't really know what the risk is cuz I don't know what the price is risk is heavily correlated to price 
if you don't know what the price is you can't determine the risk but anyway this is an upand cominging project that a lot 
of people are hyped about and I would not be shocked if this thing ends up catching some serious hype waves if we 
do get this bull run that we're all really hoping for this is one to have on your list definitely go ahead and follow 
it the next is layer zero again this is going to be one of the biggest coins in the the whole ecosystem and you can 
actually likely qualify for their airdrop if you're using their Stargate Finance defi application which allows 
you to bridge assets between different chains I highly encourage you to understand what layer zero is as this is 
likely to be one of the biggest token launches in the whole industry coming up soon shout out to the layer zero team because I've actually been collaborating 
with them on some other stuff again stuff that will be announced in 2024 now I want to be clear those are like the 
big coins those are the big pieces of tech out here that I want you to be aware of and most of those are lowerer 
risk and we'll have most likely pretty muted rewards we're not talking about 100 X's here like if Celestia goes 100x 
it would be worth like a quad zillion dollars that's not going to happen those are maybe 10 to 20x plays at the max but 
probably some of them will be closer to 5x plays in my opinion having too much of your crypto portfolio tied up in 5x 
plays feels like a waste that's my particular approach and to explain this in a little more depth I'm breaking out 
my portfolio breakdown which is in the end I have a lot of money in Treasures which I'm actually rotating quite a bit 
of money out of there because I believe interest rates have peaked and that risk is going to be the new thing to allocate 
towards that's my particular approach but in the end I have what's called a crypto barbell where on one side of the barbell I have lower risk stuff stuff I 
know is going to be there for a very long time stuff like Bitcoin stuff like coinbase stock stuff that I don't need 
to wake up in the middle of the night sweating and think has it all gone to zero has it all just evaporated into 
dust yeah yes this is the high conviction long-term bucket and in that high conviction long-term bucket we have 
Bitcoin we have ethereum we have salana and we have coinbase stock and that bucket actually has been updated because 
coinbase has been ripping salana has been absolutely ripping and this is how my long-term conviction bucket looks now 
I'm actually rotating profits whenever I do take them into salana that's my personal approach again I might rotate 
profits into some other exotic L1 if I get really carried away but this is my general plan I'm going to try to stick 
to my plan as much as I can it's also really important to make plans and write them down because the emotion of the market will carry you off into La La 
Land if you let it and if you write stuff down you can at least sober up for a second and pull yourself out of the 
Psychedelic Bull Run acid trip that has long since left planet Earth and you're 
contemplating whether a dogcoin on butthole chain can be worth $10 trillion because you saw a tick tocker made a Tik 
Tock about it and you're just wondering what the point of life is because you haven't talked to your friends in months 
and you stare at a screen all day trading crypto coins that's what the bull Run's like all right you lose your godamn marbles so keep it together all 
right keep it together and write stuff down all right a little break from the video here because if you're new to crypto you need to have a VPN and that's 
why I'm extremely proud to partner with nordvpn and be one of their leading Partners in the whole crypto space 
because if you don't have a VPN you're literally like a lamb to the slaughter here your IP address will start showing 
up on crypto sites which even though the blockchain is secure those sites could be compromised and your IP address 
effectively you could become a Target so you want to make sure that you avoid that situation with a product that only 
cost $3 per month but what's great is you get a massive discount if you use my link below again I was hacked a few 
months ago and so I take cyber security extremely seriously like I've said many 
times before you can be forgiven for a lot of mistakes in crypto a lot of them are understandable in fact even ogs make 
mistakes but one thing you will not be forgiven for is not having a VP VN it's so cheap it's so easy and best of all it 
supports the channel and I appreciate you guys so check out nordvpn sponsor of today's video and let's get back to some 
good old fashion cryptocoins back to the point here I personally think that the zero Infinity bucket is worth allocating 
to now I personally think the zero Infinity bucket has odds that in a bull run make sense because in a bull run if 
Bitcoin continues to grow usually altcoins will continue to grow especially early on in the bull run and 
quite Frank Al the risk if Bitcoin doesn't continue to grow is it could drop dramatically I mean bitcoin's up 3x 
on the year so I mean the thing could drop like 70% and still only be touching 
its 2023 low that my friends is a huge amount of downside but if you're upside 
is you know somewhat limited compared to the 100x opportunities out there and those 100x opportunities are likely to 
hold and grow if Bitcoin holds and grows then to me the crazy Bull Run logic is 
you want to be allocated in some way to these altcoins the zero Infinity bucket knowing that it goes to zero or the damn 
Moon and you're comfortable with the odds of it doing one or the other and you're ready for either outcome that's 
where I'm at again make your own decisions I have enough fiat currency I have enough cash in my world that if my 
crypto goes to zero I'll keep eating I'll keep surviving and my life won't be changed obviously it would suck ass but 
I would still continue to live and survive and pay rent a lot of people aren't in that same boat so you have to 
make the decisions based on your own Financial decisions I'm not going to be there to pay your rent or to feed your 
kids if you can't do it you got to take care of your own period okay so let's get to the fun stuff okay beam 
Merit Circle again they were called Merit Circle I covered them at about 40 cents and they've shot up here to what 
was the equivalent of $2 but when they did a 1 to 100 split on beam now the price is reflected you can think of this 
as 0.0043 or something like that so they've done about a 4.4x since I covered them absolutely smoking those 
gains and they are one of the most important coins in the crypto gaming space they have a ton of Investments 
they have a treasury of nearly $100 million they are actively invested in some of the best games in the space and 
they are now partnered with immutable X to bring some cool technology to the immutable X ZK evm speaking of immutable 
X they are also on this list as you know I an immutable X seed investor I'm a massive investor in beam and I have huge 
huge bags of both of these tokens and I am so happy to see them climbing the ranks with absolutely Reckless abandon 
here and I have no reason to doubt that they will continue to grow as gaming continues to grow my hope is that 
immutable X becomes the first gaming token to crack the top 10 in crypto market caps and just for some 
perspective here it's at $2.6 billion market cap the top 10 is 13 here so it 
would have to five or 6 x from here to overcome the Doge and to me that would 
have to do that you know against the market so this would take take a massive gaming run but I don't think it's insane 
I think it might happen here and if it does happen then that might mean that beam becomes a top 25 coin or something 
like that again understanding that crypto is about categories niches storylines and if one coin from a 
category makes it astronomically High the entire category will reprice under it so the higher immutable goes that 
creates a higher ceiling for the rest of the gaming ecosystem to flourish in so as a massive gaming bull I'm very 
excited that immutable X is continuing to crush on the way up and that to me paves the way it blazes a trail for all 
of gaming to repic under it so as you see a mutable X make this massive run know that it's bullish for all of gaming 
that's the facts Gala as we've said they are a publisher they have several games and they had a massive destructive run 
down from their all-time high their all-time high was like 70 cents they're currently at three here so on their way 
back up if they are to make it back up could do astronomical gains again their downside is about 60% % they haven't 
pumped too hard here as you can see these other ones have pumped much harder they're up much more significantly but 
about 2.1x since we called it here on the channel Ronin again similar to Gala 
they have some games far less games here like immutable has like hundreds of games that are coming to the immutable 
xchain but Ronin has axi Infinity which was the most successful crypto game of all time and they also have now pixels 
online which has 400,
    000 active users now the thing about the Ronin ecosystem is it caters largely they have a huge 
fill Lino player base and so there's a lot of emerging economy Dynamics going on there but it is a very interesting 
and totally unique way to approach gaming and again there's a lot of different approaches here I'm not 
playing gatekeeper I'm just saying here's all the pieces and as you can see Ronin has performed pretty well of about 
3.4x since we covered on the channel and that has a lot I think to do with pixels online which is this game that has a ton 
of active users right now again very few games on Ronin there's a few games on Gala there's quite a few games that are 
connected with beam actually launching on it subnet as well as dozens and dozens of Investments by the Merit 
Circle Dow and then you have a mutable X which is kind of like the big daddy gaming coin which we hope hope breaks 
into the top 10 next we have cify as you know cify is a Launchpad these launchpads as the market gets super hot 
again if we are to get this Raging Bull Market launchpads will go bananas they will go absolutely crazy because they 
will give you early access to tokens before they hit the market and token launches in a bull market can go 
absolutely dummy High I'm talking 10 20 50 100x 200x and more in the peak heat 
of the bull market and so if you get into the launch pads you can actually buy allocations to these new projects 
sometimes just 500 bucks sometimes a few thousand doll but if things go 20x 50x 
and you instantly have those tokens you can flip and make 20K 50k sometimes even 
more in single days and that is the magic of launchpads but it only works during Peak bowl season so again cify is 
kind of the leading gaming Launchpad I have a ton of cify tokens I cover them first at 60 cents here and so you're 
looking at almost a 6X since I covered them again you are welcome team elot 
trades if you guys have been rocking with the channel here in 2023 you know this has been probably the best content 
streak I've ever been on and I only intend to keep pushing harder because getting bullish early in the cycle is 
lower risk whereas getting bullish at the ultimate Peak is the higher risk and I personally hope I can get the most 
amount of people excited about this Market at an early stage when most coins are probably going to do well as opposed 
to at the end of a cycle when most coins are set up to absolutely implode that is 
the best way to do it and I hope this content helps the maximum amount of people but again it's not a team sport 
here you all got to understand it is you and you alone out there in the crypto markets once you choose to buy some 
coins next we got Prime again this is one of the most legit trading card games here in the space you have a $119 2023 
low and uh their their current value is almost 9 bucks these guys are backed by a16z they're super duper legit and in my 
opinion this could be one of the highest performing gaming tokens of the cycle I'm definitely a big fan of what they're 
doing here and I hope hope they continue to crush it as you can see their fully diluted valuation here is almost a 
billion so they only have you know small amount of their token circulating like less than 30% of their token circulating 
so it really is a tiny uh circulating Market market cap and there will be token emissions here something to 
consider but they are one of the most advanced ecosystems and they definitely deserve a slot in anyone's gaming portfolio once again my philosophy on 
gaming is that it will eventually create mainstream hits the industry will continue to have some of the most 
attention and excitement surrounding it and when anything succeeds in gaming the rest of the tokens will get a lot of 
love so that's why I'm hyperfocused on gaming because as a niche I'm convinced it's going to succeed and its success 
will mean that focusing and distributing my bets within that niche in my opinion are most likely to succeed next we have 
neotokyo now this is a project that is mine obviously there are three projects here that I have founded and I cannot 
comment on for that reason I cannot tell you how risky they are or talk about prices or anything like that as a 
Founder but what I can tell you is that neotokyo has almost certainly fulfilled its highest aspiration of becoming the 
crypto gaming Illuminati the networking Club where the power Brokers of crypto gaming come to intermingle to share 
knowledge to build to launch stuff and that's why tons of projects want to actually launch to the neotokyo holders 
in this case immutable immutable X has recently joined literally every gaming project here is a part of neotokyo 
almost and it is very much so the place to be if you are a power broker in crypto gaming community members have 
created all kinds of projects one Community member actually created a Launchpad again this is not owned or 
controlled in any way by neotokyo or me or Becker but like cify someone created a Launchpad so that citizens could get 
access to projects before they launch and projects often times choose to want to come to neotokyo because they want 
these holders these Diamond hands these power Brokers to be a part of their projects and that's why neotokyo has 
been so successful is it is an absolutely phenomenal experiment that has succeeded in every way of becoming 
the networking Club of web 3 gaming now imposters is the game of the superverse now I do want to be very clear the best 
advice I can give you is to go put the Bell notification on for superverse just like this make sure that it's turned on 
because superverse will be shedding its skin and revealing an entirely new phase of the project that is very much so the 
connecting fiber between everything that you see in front of you in the crypto gaming space there is no doubt that this 
community is the biggest and most powerful in the crypto gaming space I've been spreading the good word about 
crypto gaming since 2018 I don't want to ruin this reveal because we've been working really hard on it but all I can 
say is turn post notifications on on superverse and understand that as hard as you see me working on content as much 
as you see me getting ahead of these Trends in the industry year after year week after week month after month year 
after year cycle after cycle I'm putting far more effort orders of magnitude more into these projects and you'll soon see 
the fruits of those labors now to be clear imposters is currently an nft form and the studio behind Impostors has 
recently hired an absolute legend in the form of Rick Ellis I highly encourage you to watch this interview where Rick 
Ellis list the new head of imposters actually explains why he's so bullish on web 3 gaming and his plan to take 
imposters mainstream again these projects are my primary focus and if you believe in what I'm doing then all I ask 
you to do is turn your notifications on for those projects because there is a lot coming in 2024 that you cannot see 
and if I'm right about this crypto cycle being the one which crypto gaming breaks through to the mainstream well there's a 
whole lot in store for these projects that you can't even imagine next this is actually the first project that I'm going to put on here that's unreleased 
this is called terse and when it comes to unreleased projects I want to be completely clear the hype before the release is totally damaging to the 
project and you do not if you're not one of the early investors you do not want to be buying these projects right out of 
the gate almost all new token projects during the Bull Run come out at astronomical prices they tend to pump 
and dump and you want to kind of stay away from them until they dump like crazy but again that depends on when 
they come out and when the tokens release but I will for your understanding just put these on your radar and I'm not going to talk too much 
about them cuz I don't want to create any artificial hype about them but I just want you to know that these are projects that are coming next year that 
I think are ones you should be researching and understanding token launches are very very tumultuous and 
you should definitely be careful when you get into any new token and understand the 360 view R rever gonzilla 
ready games pixels online and I'll also add in Heroes of mavia here again these are all super highquality gaming 
projects I've invested into most of them not all of them and again I'll follow up with more information when the time is 
relevant but I'm making a 2024 video I want you guys to know what I'm thinking about for 2024 next we have shrapnel 
shrapnel is one of the hottest gaming tokens they have one of the sickest looking games they're competing in the 
Big Show which is firstperson Shooters they have their own subnet on Avalanche I certainly certainly hope that they 
succeed in their mission again any game succeeding is good for all of the games and I'm very hyped on what they're doing 
definitely part of my 20124 portfolio next big time again I never put calls on trapal big time so I just have na here 
but again big time and trapnel are two of the best looking games in the industry right now big time is one that 
is very interesting because if you're actually farming within the game you can play an MMO RPG and players are making 
up to six figures over the last few months farming their big time tokens it is something that probably won't last 
forever so if you're looking to spend some time and grind a game and maybe end up earning some crazy amounts of tokens 
I highly suggest you check out big time and of course we have cus again I've covered cus in depth they're adding a 
LaunchPad had they burnt a ton of their supply they have tons of games in their ecosystem and they are up almost 10 full 
X's since we covered them here on the channel absolutely Smokey no jokey gains 
here out of cus their goal is to focus on browser gameplay totally democratized 
no fancy chips required and they believe that the Casual gaming route is the way to onboard billions of users again 
everyone has their own strategy some games are going for immersive AAA like you're seeing with gonzilla like you're 
seeing with shrapnel like you're seeing with eluvium another one that's on my list for 2024 I don't know why it's not 
here some are going for more casual games like cus mobile games like maavia or wagi and then you also have more 
economic games like you saw out of axi Infiniti and you're seeing the same thing out of pixels online next I'm just 
going to be real this risk rating again the risk rating for all the ones in yellow is high that means you know you 
could have a 20 to 50x but you could see a 90% correction this is big big risk 
right the medium highs you're seeing maybe a 15x or an 80% correction medium you have a 75% correction and a 12x you 
just have to understand the risk scale here and again this is not very sciency I just literally pulled these numbers 
out again this is like astrology for men here embrace it we're just looking to the stars but we're hoping that we get 
something right I've caught a lot right over the years it doesn't mean that I have special powers okay I'm just a dude 
with a webcam and this bright light and a neon sign and a pudgy penguin toy okay speaking of the memes I told you I only 
have two meme positions that is Pepe and Bon and since I said that Bon has gone on such a ripper it's up 3.1 6X and 
rumor has it it's going to get listed on coinbase again this is proof that the salana ecosystem is absolutely on fire 
okay absolutely on fire heepe I still think is the Daner meme by so many orders of magnitudes hoping that the 
Frog gets its legs under it and has like a Dogecoin moment at some point in the future I don't know I could be wrong 
it's still up a bit here from where I called it only 37% not crazy here but it's up right it's up we don't turn our 
noses up at gains here not after a three-year bare Market we do not turn our noses up at gains even small gains 
now the other thing that is a strategy here and this is so degenerate this is seek medical help degenerate this is you 
need to see a doctor okay you need to see a doctor if you're doing this there's something wrong with you but if 
you do want this level of 100x 200x gains from buying literal abysmal meme coins then what you want to do is look 
for the alternate l1s like Avalanche like Cosmos ecosystem chains and you want to see when they create their 
leading meme coins if you're early to those you could maybe ride on a real rocket ride here and so that's the dgen 
next level stuff is buying meme coins that are not goated like Pepe and Bon those ones are so absurdly risky it's 
not even worth discussing here you really you really just need help you need help you need Jesus next we have the AI Niche and I'm telling you guys my 
main focus here is aosh I have my own validator on aosh so you can delegate to it it's called ELO trades new go ahead 
and delegate towards it I think AOS is doing something that almost nobody is they're allowing for subletting of GPU 
power again AI will continue to make massive news throughout this cycle every few months there's a new AI explosion of 
interest and excitement and drama that will continue driving crazy amounts of attention excitement and investment into 
AI cryptocoins that means that things like AOS which allow you to lease computing power which is the driver of 
AI right now compute power is what this is all about things like aosh will potentially become massive massive 
focuses going forward there's also a bit tensor that's kind of like the leading one I don't have a big bag of it because it literally doesn't know how to dip 
it's just been going absolutely bananas it literally will not dip but I do think that if cool apps start launching on top 
of benser the tow token that could be something to look for again aosh is 
something I've been holding for years I believe they'll continue to crush it and if I were to say so it's my favorite AI 
coin I don't have a ton of AI coins but I do believe Ai and gaming will be the driving narratives of this bull run 
onward if you're looking for a little something extra there's dexes like dydx okay I could see Americans getting 
frustrated not having access to Futures Trading because none of the exchanges let Americans on anymore so 
decentralized Futures like dydx could become interesting again it doesn't pump very hard but I think their new version 
of their protocol which shares fees is quite interesting for me the nft play besides obviously neotokyo and imposters 
the nft play that is most likely to pull a board ape this cycle is pudgy penguins and that's because lucanet the CEO is an 
absolute Beast I'm a friend of his and I think his vision is going to take him somewhere crazy so if there's a next nft 
that is pudgy Penguins you're looking at to me the only thing I see as a pfp project that could hit 100 eth plus I 
think pudgy Penguins would be that crazy one again they've traded as low as 4 eth this year they're up quite a bit but 
they just keep delivering and they recently previewed this pudgy World concept which to me screams that they're 
making a video game and that they will transition from being a consumer packaged Goods project to being a video 
game project which to me is giga bullish cuz gaming to me is the thing I believe in the most most next if we're talking 
about ways that you can enhance your 2024 portfolio you're going to want to look at rotations this is when certain 
ecosystems like salana Ava Cosmos whenever they get hot you'll see the coins within those ecosystems get hot 
again I don't know what those coins are I'm not bringing attention to any of them in specific but let's just say you didn't want to do gaming for some reason 
or you didn't want to do AI you wanted to play in specific ecosystems this is one way to do it I'll end here with 
finally two D5 plays one of which I was an early investor into called Prisma I personally think Prisma will have a 
really nice future again I'm an early investor I plan to hold those tokens for a significant amount of time and see how 
the project performs it's still pretty under the radar as well this is in the liquid staking token narrative where you 
can stake your stake eth and get additional yield on top very interesting project as well as Rune which allows you 
to do onchain swaps between things like ethereum and Bitcoin I think Rune is kind of in its own category so Prisma 
and Rune are the two that I like for defi if I was to pick a defi coin okay 
this Raw video file is now almost an hour and 10 minutes if you guys feel like I delivered a tremendous amount of 
value for this 2024 portfolio overview the way I've gone through and explained why I'm in each one of these coins the 
risk involved the upside the downside the left side the right side then smash that like button and make sure you subscribe with that Bell notification on 
I believe that this is going to be one of the most incredible Cycles we've ever seen but of course there is a risk it doesn't play out if it does however I'm 
confident that gaming will be the most transformative place to be and I'm excited to continue to show you the light throughout this journey if I 
missed your favorite token you know what to do leave me a comment in the comment section below if you enjoyed this video check out this one that I made just a 
few days ago which goes even into more detail on some alt coins that I love as always I'm elot trades and I'll see you 
very soon on the next 
episode 
 `,
  })
); */

/* const data = {

  projects: [
    {
      rpoints: 9,
      category: ["Layer 1"],
      marketcap: "large",
      timestamps: ["00:00:06", "00:00:11", "00:01:06"],
      total_count: 3,
      coin_or_project: "Ethereum",
    },
    {
      rpoints: 8,
      category: ["Layer 1"],
      marketcap: "large",
      timestamps: ["00:00:06", "00:03:31", "00:04:23"],
      total_count: 3,
      coin_or_project: "Bitcoin",
    },
    {
      rpoints: 8,
      category: ["Layer 1"],
      marketcap: "large",
      timestamps: ["00:00:14", "00:18:31", "00:19:19"],
      total_count: 3,
      coin_or_project: "Solana",
    },
    {
      rpoints: 7,
      category: ["Layer 1"],
      marketcap: "large",
      timestamps: ["00:00:16", "00:18:32", "00:20:39"],
      total_count: 3,
      coin_or_project: "Cardano",
    },
    {
      rpoints: 7,
      category: ["Meme coins"],
      marketcap: "large",
      timestamps: ["00:18:31", "00:19:25", "00:22:25"],
      total_count: 3,
      coin_or_project: "Dogecoin",
    },
    {
      rpoints: 8,
      category: ["Layer 1", "Gaming"],
      marketcap: "medium",
      timestamps: ["00:18:32", "00:22:08", "00:22:18"],
      total_count: 3,
      coin_or_project: "Avalanche",
    },
    {
      rpoints: 7,
      category: ["DeFi", "Oracle"],
      marketcap: "large",
      timestamps: ["00:18:32", "00:18:38"],
      total_count: 2,
      coin_or_project: "Chainlink",
    },
    {
      rpoints: 8,
      category: ["Layer 1"],
      marketcap: "medium",
      timestamps: ["00:18:37", "00:22:18"],
      total_count: 2,
      coin_or_project: "Sui",
    },
    {
      rpoints: 8,
      category: ["Payments"],
      marketcap: "large",
      timestamps: ["00:18:37", "00:19:18"],
      total_count: 2,
      coin_or_project: "XRP",
    },
    {
      rpoints: 7,
      category: ["Exchange token"],
      marketcap: "large",
      timestamps: ["00:19:36", "00:19:43", "00:19:50"],
      total_count: 3,
      coin_or_project: "Binance Coin",
    },
    {
      rpoints: 8,
      category: ["Layer 1", "AI"],
      marketcap: "medium",
      timestamps: ["00:24:31"],
      total_count: 1,
      coin_or_project: "Near Protocol",
    },
    {
      rpoints: 8,
      category: ["DeFi", "AI"],
      marketcap: "medium",
      timestamps: ["00:24:36"],
      total_count: 1,
      coin_or_project: "Internet Computer",
    },
    {
      rpoints: 8,
      category: ["AI"],
      marketcap: "medium",
      timestamps: ["00:24:37"],
      total_count: 1,
      coin_or_project: "Bittensor",
    },
    {
      rpoints: 8,
      category: ["AI"],
      marketcap: "small",
      timestamps: ["00:24:49"],
      total_count: 1,
      coin_or_project: "AIOZ Network",
    },
    {
      rpoints: 8,
      category: ["AI"],
      marketcap: "small",
      timestamps: ["00:24:53"],
      total_count: 1,
      coin_or_project: "Destra Network",
    },
    {
      rpoints: 8,
      category: ["RWA"],
      marketcap: "small",
      timestamps: ["00:23:25"],
      total_count: 1,
      coin_or_project: "ZIGChain",
    },
    {
      rpoints: 8,
      category: ["RWA"],
      marketcap: "small",
      timestamps: ["00:23:27", "00:23:30"],
      total_count: 2,
      coin_or_project: "PinLink",
    },
  ],
  total_count: 34,
  total_rpoints: 135,
};
function getOffsetTimestamps(timeStamp) {
  const split = timeStamp.split(":");
  const hours = split[0];
  const minutes = split[1];
  const seconds = split[2];
  let totalSeconds = hours * 3600 + minutes * 60 + seconds;
  totalSeconds = parseInt(totalSeconds);
  const negativeOffset = Math.max(0, totalSeconds - 2);
  const positiveOffset = totalSeconds + 2;
  const negativeOffsetTime = formatTimestamp(negativeOffset);
  const positiveOffsetTime = formatTimestamp(positiveOffset);
  return [negativeOffsetTime, timeStamp, positiveOffsetTime];
}
const timestamps = getOffsetTimestamps(data.projects[0].timestamps[0]);

console.log(`${timestamps[0]}: ${timestamps[1]}:  ${timestamps[2]}`); */
const data = [
  {
    coin_or_project: "Axie_Infinity",
    content:
      "Bitcoin (BTC), Ethereum (ETH), Ripple (XRP)\nBitcoin (BTC), Ethereum (ETH), Litecoin (LTC), Ripple (XRP), Monero (XMR)\nSolana (SOL), Chainlink (LINK), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad (MON), Layer Zero (ZRO), Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON)\nSolana (SOL), Chainlink (LINK), Avalanche (AVAX), Coinbase (COIN), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad (MON), Layer Zero (ZRO), Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON)\nSolana (SOL), ChainLink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam, ImmutableX (IMX), Gala (GALA), Ronin (RON)\nSolana (SOL), Chainlink (LINK), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam, ImmutableX (IMX), Gala (GALA), Ronin (RON)",
    usage: 0.0164,
  },
  {
    coin_or_project: "Dogecoin",
    content:
      "BNB (BNB), XRP (XRP), Solana (SOL), USDC (USDC), Lido Staked Ether (STETH), Cardano (ADA), Dogecoin (DOGE), Avalanche (AVAX), Polkadot (DOT), TRON (TRX), Polygon (MATIC), Chainlink (LINK)\nBNB (BNB), XRP (XRP), Solana (SOL), USDC (USDC), Lido Staked Ether (STETH), Cardano (ADA), Dogecoin (DOGE), Avalanche (AVAX), Polkadot (DOT), TRON (TRX), Polygon (MATIC), Chainlink (LINK)\nBitcoin (BTC)\nDogecoin (DOGE)\nBitcoin (BTC)\nBitcoin (BTC)",
    usage: 0.0154,
  },
  {
    coin_or_project: "Neotokyo",
    content:
      "Bitcoin (BTC)\nBitcoin (BTC)\nImmutable (IMX)\nBitcoin (BTC)\nBitcoin (BTC)\nBitcoin (BTC)",
    usage: 0.0144,
  },
  { coin_or_project: "Monad", content: "Monad (MON)", usage: 0.0024 },
  {
    coin_or_project: "dYdX",
    content:
      "Solana (SOL), Chainlink (LINK), Avalanche (AVAX), Polygon (MATIC), Internet Computer (ICP), ImmutableX (IMX), Ronin (RON), Pepe (PEPE), Bonk (BONK), Akash (AKT), Bittensor (TAO), DyDx (DYDX)\nSolana (SOL), ChainLink (LINK), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Internet Computer (ICP), Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME (PRIME), Pepe (PEPE), Bonk (BONK), Akash (AKT), Bittensor (TAO), dYdX (DYDX)\nSolana (SOL), Chainlink (LINK), Avalanche (AVAX), Polygon (MATIC), Internet Computer (ICP), ImmutableX (IMX), Ronin (RON), Pepe (PEPE), Akash (AKT), dYdX (DYDX)\nSolana (SOL), Chainlink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad (MONAD), Layer Zero (ZRO), Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME (PRIME), Neo Tokyo (NT), Impostors (IMPOSTORS), SuperVerse (SUPER), Treverse (TREVERSE), Gunzilla (GUNZ), Ready Games (AURA), Pixels Online (PIXEL), Shrapnel (SHRAP), BIGTIME (BIGTIME), Sidus (SIDUS), Pepe (PEPE), Bonk (BONK), Akash (AKT), Bittensor (TAO), DyDx (DYDX)",
    usage: 0.0126,
  },
  {
    coin_or_project: "Coinbase",
    content:
      "Solana (SOL), Chainlink (LINK)\nSolana (SOL), ChainLink (LINK)\nSolana (SOL), Chainlink (LINK)\nSolana (SOL), Chainlink (LINK), Coinbase (COIN)\nSolana (SOL), Chainlink (LINK), Coinbase (COIN)",
    usage: 0.0122,
  },
  {
    coin_or_project: "Internet_Computer",
    content:
      "Internet Computer (ICP)\nInternet Computer (ICP), Bitcoin (BTC), Ethereum (ETH)\nInternet Computer (ICP)\nInternet Computer (ICP), Bitcoin (BTC), Ethereum (ETH)",
    usage: 0.0096,
  },
  {
    coin_or_project: "Chainlink",
    content:
      "Solana (SOL), Chainlink (LINK)\nSolana (SOL), ChainLink (LINK)\nSolana (SOL), Chainlink (LINK)\nSolana (SOL), Chainlink (LINK)",
    usage: 0.0096,
  },
  {
    coin_or_project: "Heroes_of_Mavia",
    content:
      "Solana (SOL), Chainlink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Celestia (TIA), Internet Computer (ICP), Monad (MON), Layer Zero (ZRO), Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME (PRIME)\nSolana (SOL), Chainlink (LINK), Avalanche (AVAX), Polygon (MATIC), Internet Computer (ICP), Ronin (RON)",
    usage: 0.0056,
  },
  {
    coin_or_project: "Terse",
    content:
      "Bitcoin (BTC)\nSolana (SOL), Chainlink (LINK), Avalanche (AVAX), Coinbase (COIN), Celestia (TIA), Injective (INJ), Internet Computer (ICP), Monad (MON), Layer Zero (ZRO), Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME (PRIME)\nBitcoin (BTC)\nBitcoin (BTC)\nSolana (SOL), Chainlink (LINK), Avalanche (AVAX), Coinbase (COIN), Celestia (TIA), Injective (INJ), Internet Computer (ICP), Monad (MON), Layer Zero (ZRO), Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME (PRIME)\nBitcoin (BTC)",
    usage: 0.0156,
  },
  {
    coin_or_project: "Bitcoin",
    content: "Bitcoin (BTC)\nBitcoin (BTC)",
    usage: 0.0048,
  },
  {
    coin_or_project: "Solana",
    content:
      "Solana (SOL), Chainlink (LINK), Avalanche (AVAX)\nSolana (SOL)\nSolana (SOL), Chainlink (LINK), Coinbase (COIN), Avalanche (AVAX)\nBitcoin (BTC)\nSolana (SOL)",
    usage: 0.0122,
  },
  {
    coin_or_project: "Ronin",
    content:
      "Solana (SOL), ChainLink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam, ImmutableX (IMX), Gala (GALA), Ronin (RON)\nSolana (SOL), Chainlink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Celestia (TIA), Monad (MON), Injective (INJ), Internet Computer (ICP), Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON)\nSolana (SOL), Chainlink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam, ImmutableX (IMX), Gala (GALA), Ronin (RON)\nSolana (SOL), Chainlink (LINK), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON)\nSolana (SOL), ChainLink (LINK), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON)\nSolana (SOL), Chainlink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad (MON), Layer Zero (ZRO), Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON)",
    usage: 0.0172,
  },
  {
    coin_or_project: "Ethereum",
    content:
      "Solana (SOL)\nSolana (SOL)\nSolana (SOL), Chainlink (LINK), Avalanche (AVAX), Polygon (MATIC), Internet Computer (ICP), Ronin (RON), Akash (AKT), Bittensor (TAO), DyDx (DYDX), Prisma (PRISMA), Rune (RUNE)\nSolana (SOL), Chainlink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Akash (AKT), Bittensor (TAO), dYdX (DYDX), Pudgy Penguins, Pepe (PEPE), Bonk (BONK), Rune (RUNE)\nSolana (SOL)\nSolana (SOL)",
    usage: 0.0157,
  },
  {
    coin_or_project: "Seedify",
    content:
      "Solana (SOL), Chainlink (LINK), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam, ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND)\nSolana (SOL), Chainlink (LINK), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad (MON), Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND)",
    usage: 0.0058,
  },
  {
    coin_or_project: "THORChain",
    content:
      "Solana (SOL), Chainlink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse (SUPER), Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME, SIDUS, Pepe (PEPE), Bonk (BONK), Akash (AKT), Bittensor (TAO), dYdX (DYDX), Pudgy Penguins, Prisma (PRISMA), RUNE\nSolana (SOL), Chainlink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam, ImmutableX (IMX), GALA (GALA), Ronin (RON), Seedify (SFUND), PRIME (PRIME), Neo Tokyo, Impostors, SuperVerse (SUPER), Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME, SIDUS, Pepe (PEPE), Bonk (BONK), Akash (AKT), Bittensor (TAO), dYdX (DYDX), Pudgy Penguins, Prisma (PRISMA), RUNE",
    usage: 0.0072,
  },
  {
    coin_or_project: "Imposters",
    content:
      "Solana (SOL), ChainLink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam, ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME\nBitcoin (BTC)\nSolana (SOL), Chainlink (LINK), Avalanche (AVAX), Polygon (MATIC), Celestia (TIA), Internet Computer (ICP), Monad (MON), Layer Zero (ZRO), Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME (PRIME)\nSolana (SOL), Chainlink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad (MONAD), Layer Zero (ZRO), Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME (PRIME), Neo Tokyo (BYTES), Impsoters (IMPOSTERS), SuperVerse (SUPER)\nSolana (SOL), Chainlink (LINK), Avalanche (AVAX), Coinbase (COIN), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam, ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME",
    usage: 0.0143,
  },
  {
    coin_or_project: "Pepe",
    content:
      "Bitcoin (BTC)\nBitcoin (BTC)\nBitcoin (BTC)\nShiba Inu (SHIB)\nBitcoin (BTC)",
    usage: 0.012,
  },
  {
    coin_or_project: "Shrapnel",
    content:
      "Solana (SOL), Chainlink (LINK), Avalanche (AVAX), Polygon (MATIC), Internet Computer (ICP), ImmutableX (IMX), Ronin (RON)\nSolana (SOL), ChainLink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam, ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse (SUPER), Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME, SIDUS\nSolana (SOL), Chainlink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad (MON), Layer Zero (ZRO), Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME (PRIME)\nSolana (SOL), Chainlink (LINK), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Internet Computer (ICP), ImmutableX (IMX), Ronin (RON)\nSolana (SOL), Chainlink (LINK), Avalanche (AVAX), Polygon (MATIC), Coinbase (COIN), Internet Computer (ICP), ImmutableX (IMX), Ronin (RON), Gala (GALA), Beam (BEAM), Seedify (SFUND), PRIME (PRIME), BIGTIME (BIGTIME), SIDUS (SIDUS)\nSolana (SOL), Chainlink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad (MON), Layer Zero (ZRO), Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME (PRIME)",
    usage: 0.0174,
  },
  {
    coin_or_project: "Beam",
    content:
      "Solana (SOL), Chainlink (LINK), Avalanche (AVAX), Polygon (MATIC), ImmutableX (IMX)\nSolana (SOL), Chainlink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam (BEAM), ImmutableX (IMX)\nSolana (SOL), Chainlink (LINK), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), ImmutableX (IMX), Gala (GALA), Ronin (RON)\nSolana (SOL), Chainlink (LINK), Avalanche (AVAX), Coinbase (COIN), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam (BEAM), ImmutableX (IMX)\nSolana (SOL), Chainlink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam, ImmutableX (IMX), Gala (GALA), Ronin (RON)\nSolana (SOL), Chainlink (LINK), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), ImmutableX (IMX)",
    usage: 0.0165,
  },
  {
    coin_or_project: "Gala",
    content:
      "Solana (SOL)\nSolana (SOL), Chainlink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Celestia (TIA), Injective (INJ), Internet Computer (ICP), Monad, Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON)\nSolana (SOL), Chainlink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad (MON), Layer Zero (ZRO), Beam (BEAM), ImmutableX (IMX), Gala (GALA)\nSolana (SOL), Chainlink (LINK), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), ImmutableX (IMX), Gala (GALA), Ronin (RON)\nSolana (SOL)",
    usage: 0.0134,
  },
  {
    coin_or_project: "Big_Time",
    content:
      "Solana (SOL), Chainlink (LINK), Avalanche (AVAX), Polygon (MATIC), Internet Computer (ICP)\nSolana (SOL), Chainlink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad (MON), Layer Zero (ZRO), Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME (PRIME), Neo Tokyo (NT), Impostors (IMPOSTORS), SuperVerse (SUPER), Treeverse (TREE), Gunzilla (GUN), Ready Games (AURA), Pixels Online (PIXEL), Shrapnel (SHRAP), BIGTIME (BIGTIME)\nSolana (SOL), Chainlink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME\nSolana (SOL), Chainlink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad (MON), Layer Zero (ZRO), Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME (PRIME), Treeverse (TREE), Gunzilla (GUN), Ready Games (AURA), Pixels Online (PIXEL), Shrapnel (SHRAP), BIGTIME (BIGTIME)",
    usage: 0.0125,
  },
  {
    coin_or_project: "Celestia",
    content:
      "Solana (SOL), Chainlink (LINK), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA)\nSolana (SOL), ChainLink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ)\nSolana (SOL), ChainLink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA)",
    usage: 0.0078,
  },
  {
    coin_or_project: "AIOZ",
    content:
      "Solana (SOL), ChainLink (LINK), Avalanche (AVAX), Polygon (MATIC), Internet Computer (ICP), ImmutableX (IMX), Ronin (RON), Pepe (PEPE), Bonk (BONK)\nSolana (SOL), Chainlink (LINK), Avalanche (AVAX), Polygon (MATIC), Internet Computer (ICP), ImmutableX (IMX), Gala (GALA), Ronin (RON), Pepe (PEPE), Bonk (BONK), Akash (AKT)",
    usage: 0.0055,
  },
  {
    coin_or_project: "Prisma",
    content:
      "Solana (SOL), Chainlink (LINK), Avalanche (AVAX), Polygon (MATIC), Internet Computer (ICP), ImmutableX (IMX), Ronin (RON), Akash (AKT), dYdX (DYDX), RUNE\nSolana (SOL), Chainlink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad (MON), Layer Zero (ZRO), Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME (PRIME), Pepe (PEPE), Bonk (BONK), Akash (AKT), Bittensor (TAO), dYdX (DYDX), Pudgy Penguins (PENG), Rune (RUNE)\nSolana (SOL), Chainlink (LINK), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Internet Computer (ICP), ImmutableX (IMX), Ronin (RON), Beam (BEAM), GALA (GALA), Seedify (SFUND), PRIME (PRIME), Bonk (BONK), DyDx (DYDX), RUNE (RUNE)",
    usage: 0.0092,
  },
  {
    coin_or_project: "Immutable_X",
    content:
      "Solana (SOL), Chainlink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad (MON), Layer Zero (ZRO), Beam (BEAM)\nSolana (SOL), Chainlink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam (BEAM), ImmutableX (IMX)\nSolana (SOL), Chainlink (LINK), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam\nBeam (BEAM), Fetch.ai (FET), Internet Computer (ICP), aelf (ELF), Hedera (HBAR), Cardano (ADA), NEO (NEO), ApeCoin (APE), KuCoin (KCS)\nBeam (BEAM), Fetch.ai (FET), Internet Computer (ICP), aelf (ELF), Hedera (HBAR), Cardano (ADA), NEO (NEO), ApeCoin (APE), KuCoin (KCS), VeChain (VET)\nSolana (SOL), Chainlink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam (BEAM), ImmutableX (IMX)",
    usage: 0.0166,
  },
  {
    coin_or_project: "Ready_Games",
    content:
      "Solana (SOL), Chainlink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse (SUPER), Treeverse, Gunzilla, Ready Games\nSolana (SOL)\nSolana (SOL), ChainLink (LINK), Avalanche (AVAX), Polygon (MATIC), Internet Computer (ICP), ImmutableX (IMX), Ronin (RON), Gala (GALA)",
    usage: 0.0082,
  },
  {
    coin_or_project: "LayerZero",
    content:
      "Bitcoin (BTC)\nBitcoin (BTC), Ethereum (ETH), Solana (SOL)\nBitcoin (BTC), Ethereum (ETH), Solana (SOL)\nBitcoin (BTC), Ethereum (ETH)\nBitcoin (BTC)\nMonad (MON)",
    usage: 0.0144,
  },
  {
    coin_or_project: "Injective",
    content:
      "Injective (INJ), Bitcoin (BTC), Ethereum (ETH)\nInjective (INJ), Bitcoin (BTC), Ethereum (ETH)\nInjective (INJ), Bitcoin (BTC), Ethereum (ETH)\nInjective (INJ), Bitcoin (BTC), Ethereum (ETH)\nSolana (SOL), Chainlink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC)\nInjective (INJ), Bitcoin (BTC), Ethereum (ETH)",
    usage: 0.015,
  },
  {
    coin_or_project: "Rever",
    content:
      "Bitcoin (BTC)\nSolana (SOL), Chainlink (LINK), Avalanche (AVAX), Polygon (MATIC), Internet Computer (ICP), ImmutableX (IMX), Ronin (RON), Gala (GALA), Beam (BEAM), Seedify (SFUND), PRIME (PRIME)\nBitcoin (BTC)\nSolana (SOL), Chainlink (LINK), Avalanche (AVAX), Polygon (MATIC), Celestia (TIA), Internet Computer (ICP), Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME (PRIME), Shrapnel (SHRAP), BIGTIME (BIGTIME)",
    usage: 0.0106,
  },
  {
    coin_or_project: "Gonzilla",
    content:
      "Solana (SOL), Chainlink (LINK), Avalanche (AVAX), Internet Computer (ICP), ImmutableX (IMX), Ronin (RON), Gala (GALA), Seedify (SFUND), Beam (BEAM), PRIME (PRIME), BIGTIME (BIGTIME), SIDUS (SIDUS)\nSolana (SOL), Chainlink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, BIGTIME, SIDUS",
    usage: 0.0058,
  },
  {
    coin_or_project: "Echelon_Prime",
    content:
      "Solana (SOL), ChainLink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad (MON), Layer Zero (ZRO), Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME (PRIME)\nSolana (SOL), Chainlink (LINK), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME (PRIME)",
    usage: 0.0059,
  },
  {
    coin_or_project: "Bonk",
    content: "(empty string)\nBitcoin (BTC)\nBitcoin (BTC)",
    usage: 0.0072,
  },
  {
    coin_or_project: "Polygon",
    content:
      "Polygon (MATIC)\nPolygon (MATIC), Ethereum (ETH)\nPolygon (MATIC), Ethereum (ETH)\nPolygon (MATIC), Ethereum (ETH)\nSolana (SOL), Chainlink (LINK), Avalanche (AVAX), Polygon (MATIC)\nPolygon (MATIC), Ethereum (ETH)",
    usage: 0.0145,
  },
  {
    coin_or_project: "Avalanche",
    content:
      "Solana (SOL), Chainlink (LINK), Avalanche (AVAX)\nSolana (SOL), Chainlink (LINK), Coinbase (COIN), Avalanche (AVAX)\nSolana (SOL), Chainlink (LINK), Avalanche (AVAX)\nSolana (SOL), ChainLink (LINK), Avalanche (AVAX)\nSolana (SOL), Chainlink (LINK), Avalanche (AVAX)",
    usage: 0.0125,
  },
  {
    coin_or_project: "Superverse",
    content:
      "Bitcoin (BTC)\nBitcoin (BTC)\nSuperVerse (SUPER)\nSolana (SOL), Chainlink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse (SUPER)\nSolana (SOL), Chainlink (LINK), Avalanche (AVAX), Coinbase (COIN), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam, ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME\nBitcoin (BTC)",
    usage: 0.0155,
  },
  {
    coin_or_project: "Pudgy_Penguins",
    content:
      "Solana (SOL), Chainlink (LINK), Avalanche (AVAX), Polygon (MATIC), Internet Computer (ICP), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME (PRIME), Pepe (PEPE), Bonk (BONK), Akash (AKT), Bittensor (TAO), dYdX (DYDX)\nSolana (SOL), Chainlink (LINK), Avalanche (AVAX), Polygon (MATIC), Internet Computer (ICP), ImmutableX (IMX), Ronin (RON), Pepe (PEPE), Bonk (BONK), Akash (AKT), dYdX (DYDX)\nSolana (SOL), Chainlink (LINK), Avalanche (AVAX), Polygon (MATIC), Internet Computer (ICP), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME (PRIME), Pepe (PEPE), Bonk (BONK), Akash (AKT), BitTensor (TAO), dYdX (DYDX)\nSolana (SOL), Chainlink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad (MONAD), Layer Zero (ZRO), Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME (PRIME), Neo Tokyo (NT), Impostors (IMPOSTORS), SuperVerse (SUPER), Treeverse (TREE), Gunzilla (GUNZ), Ready Games (RDYX), Pixels Online (PIXEL), Shrapnel (SHRAP), BIGTIME (BIGTIME), SIDUS (SIDUS), Pepe (PEPE), Bonk (BONK), Akash (AKT), Bittensor (TAO), dYdX (DYDX)\nSolana (SOL), ChainLink (LINK), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Internet Computer (ICP), ImmutableX (IMX), Ronin (RON), Akash (AKT), BitTensor (TAO), dYdX (DYDX)\nSolana (SOL), Chainlink (LINK), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Internet Computer (ICP), ImmutableX (IMX), Gala (GALA), Ronin (RON), Pepe (PEPE), Bonk (BONK), Akash (AKT), Bittensor (TAO), dYdX (DYDX)",
    usage: 0.0184,
  },
  {
    coin_or_project: "Pixels",
    content:
      "Solana (SOL), Chainlink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME\nSolana (SOL), Chainlink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam, ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME, SIDUS, Pepe, Bonk\nSolana (SOL), Chainlink (LINK), Avalanche (AVAX), Polygon (MATIC), Internet Computer (ICP)\nSolana (SOL), Chainlink (LINK), Avalanche (AVAX), Polygon (MATIC), Celestia (TIA), Internet Computer (ICP), Beam (BEAM), ImmutableX (IMX), Ronin (RON), Seedify (SFUND), PRIME (PRIME), SIDUS (SIDUS)",
    usage: 0.0115,
  },
];
const validC = await validateCoins(data);

export const transcript = `# tactiq.io free youtube transcript
# SELL BTC: These 7 Crypto Coins Will 23x By 2025 (Still Early)
# https://www.youtube.com/watch/JgjGJTrL3hY

00:00:00.060 [Music]
00:00:04.680 that's right baby the alpha K is back
00:00:08.280 streaming live to you and you are here
00:00:10.800 for one reason you see Bitcoin making 5
00:00:13.480 10 15% gains you say no I don't want to
00:00:16.160 take home the mama conservative games I
00:00:18.520 want the RedHot dirty only fans $5
00:00:22.199 content type games the dirty alt coins
00:00:24.680 and get the five 10 20 x's and leave my
00:00:27.920 unspeakables burning for years you want
00:00:30.279 alt coins that go pop you want the coins
00:00:33.000 that make you
00:00:34.079 go oh my and I got news for you my
00:00:36.719 chunky little pervert you're in the
00:00:38.559 right place that's exactly what we're
00:00:40.440 going to be getting into in this video
00:00:42.399 before it's banned off YouTube for being
00:00:44.160 too hot you see in this video I'm going
00:00:45.800 to give you the coins they're going
00:00:48.520 top coins we've mentioned lately like
00:00:51.280 nuro oh my heck even peanut up 10
00:00:54.719 billion Z it's up it's a squirrel it
00:00:57.680 flies oh my and let's be frank about
00:01:00.840 what's going on here you're fing back in
00:01:03.239 the crypto after four literal years of
00:01:05.840 me telling you hey you should buy when
00:01:07.759 it's low you see Lord peanut patron
00:01:10.159 saint of Magnum dongs leading with mega
00:01:12.960 gains hell you even see your neighbor
00:01:15.000 who is a well-known cardono holder they
00:01:17.200 have to introduce themselves to everyone
00:01:18.759 in the neighborhood before they move in
00:01:20.720 you even see him making the big bucks
00:01:22.320 now taking his wife and her boyfriend on
00:01:24.240 the hottest of dates I'm talking about
00:01:26.200 some real Olive golden Red Lobster style
00:01:29.000 they're Banking and you're thinking to
00:01:30.520 yourself I want that for me I deserve
00:01:33.360 this and let's be straight no you don't
00:01:35.399 but in this video I'm going to be giving
00:01:36.759 you those coins like I said before the
00:01:39.320 coins that go P the coins that make you
00:01:43.000 go oh my coins that I've given you light
00:01:46.079 super oh my Destra oh my
00:01:52.520 ax and pal oh oh wait no this one edit
00:01:57.159 this out just no Co did you missed out
00:01:59.360 on cuz Tech Al you just haven't been
00:02:01.000 around I've been releasing my same dog
00:02:03.039 [ __ ] quality content for the past 4
00:02:04.600 years and you just have been flicking
00:02:06.159 your bean and playing fortnite or
00:02:07.600 something and now you are here at the
00:02:09.440 feet of the most woke most famous
00:02:11.800 familyfriendly empty house crypto advice
00:02:14.519 guy the alpha golden K and luckily for
00:02:18.200 you I can say actually with a straight
00:02:20.400 face character aside this is probably
00:02:23.080 actually your last chance to get into
00:02:25.239 these coins before alt season begins
00:02:27.400 because it is a right around the corner
00:02:29.080 it's waiting like a holder watching from
00:02:31.040 the closet just inches away from the
00:02:33.000 action and in this video what I'm going
00:02:34.800 to do is I'm going to get you in on that
00:02:36.599 action you're not going to be watching
00:02:37.920 like a cardono holder you're going to be
00:02:39.400 the one doing the [ __ ] because in this
00:02:42.280 video I'm not just going to give you
00:02:43.720 some of the hottest Industries and
00:02:45.000 niches and ALT coins you need to be
00:02:46.400 looking at I'm also going to show you
00:02:47.800 how alt season is going to work so that
00:02:49.519 for the two or 3% of viewers on this
00:02:51.120 channel have an IQ above 10 you can
00:02:52.959 actually go get your own coins and find
00:02:54.720 your own coins will pop coins will make
00:02:56.560 you go oh my and then we're going to get
00:02:58.519 into the hottest nich in crypto and in
00:03:00.920 throughout this video I'll be listing
00:03:02.959 the coins that I'm looking at but unlike
00:03:04.879 other videos where I just list them all
00:03:06.319 at once and then you records come in
00:03:07.959 here ape in and lose all your money I'm
00:03:09.720 going to subtly list them throughout the
00:03:11.239 video so you have to pay attention cuz
00:03:13.239 you goofy little [ __ ] you come here you
00:03:15.599 try to get the coins without the
00:03:17.400 understanding it's like giving a Jedi a
00:03:19.200 lightsaber without teaching them how to
00:03:20.599 use the force remember what happened
00:03:22.080 last time oh my that was bad so without
00:03:25.480 further Ado what we're going to do is
00:03:27.000 we're going to hop into the Zone we're
00:03:28.400 going to hop into the nether region I'm
00:03:31.319 going to show you the coins we're going
00:03:32.680 to we're going to load up my computer
00:03:34.319 and I'm going to show you how this alt
00:03:36.599 season is likely going to work and break
00:03:38.760 down exactly where you should probably
00:03:40.799 most certainly definitely be looking in
00:03:42.720 crypto right now so without further Ado
00:03:45.080 let's get
00:03:47.159 started so first things first let's load
00:03:49.400 up coin market cap and get into the very
00:03:51.120 lowquality unacceptable level of content
00:03:53.640 you've come to know and enjoy on this
00:03:55.280 channel we're not upping the budget
00:03:56.680 we're not upping the quality I realize
00:03:58.239 it's a bull run but what we're going to
00:03:59.519 do on this channel so we're slowly going
00:04:01.239 to just make the channel worse and worse
00:04:03.400 as The Bull Run goes on because it's
00:04:05.200 [ __ ] funny but on a serious note
00:04:06.959 let's talk about what's happen in the
00:04:08.040 market and what's about to happen my
00:04:09.640 first big tip for you is follow me on
00:04:11.720 Twitter at zss Becker no it's not X it's
00:04:14.720 Twitter I'm 36 years old I'm not
00:04:16.839 learning new tricks or new words time
00:04:18.798 froze for me at 35 I still play the
00:04:21.279 Nintendo 64 I refused to move on with my
00:04:23.759 life but seriously follow me there cuz
00:04:25.560 these videos take me forever to make and
00:04:27.479 contrary to Common belief I don't wake
00:04:28.919 up every morning one inject myself with
00:04:30.680 heroin and cocaine to amp myself up to
00:04:32.800 make those stupid intros so follow me on
00:04:34.600 Twitter CU get updates a lot faster a
00:04:37.520 lot sooner there and this bowl is going
00:04:39.240 to move lightning fast so you need
00:04:41.800 updates much faster than I can make in
00:04:43.280 these videos but if you want these
00:04:44.600 videos and more of them you should
00:04:45.800 subscribe cuz most of you aren't
00:04:47.160 subscribed and again the bowl is going
00:04:48.880 to move fast so I'm going to make these
00:04:50.280 videos and then a week later the
00:04:51.880 content's going to be completely out of
00:04:53.400 date and then a week later the entire
00:04:55.080 Market could change so you want to be on
00:04:56.800 top of updates instead of not on top of
00:04:58.680 them now look I realized you just want
00:05:00.600 me to jump in the coin picks and start
00:05:02.400 slapping out bangers left and right you
00:05:04.479 want me to just throw out the next
00:05:06.160 peanut like I did a few weeks ago it is
00:05:08.280 now up uh 18 billion per. and I know
00:05:11.440 what you're thinking Alex you never
00:05:12.919 actually told me to buy peanut wait wait
00:05:15.120 wait I sh posted about peanut non-stop
00:05:17.800 during election I even saw this coin all
00:05:20.199 I did was post little pictures of this
00:05:22.120 [ __ ] squirrel all over my Twitter yes
00:05:24.280 sure I didn't buy any and I technically
00:05:26.160 didn't mention the coin but I basically
00:05:28.240 made peanut I'm taking credit for this
00:05:30.639 everyone who's made money here this is
00:05:32.080 due to me and I just didn't get on on
00:05:33.840 Peanut because I was just being
00:05:35.160 charitable I just wanted everybody else
00:05:37.280 to make money with peanut on a serious
00:05:39.960 note I did sh post about peanut 24/7 and
00:05:43.080 didn't buy any of it and [ __ ] all you
00:05:45.280 people that got in this I hate you you
00:05:47.039 are human ass I will resent you and I
00:05:49.319 hope you never make money ever again
00:05:50.960 because you've exposed me for the sh sh
00:05:53.160 crypto investor I am how did I miss this
00:05:55.240 but on a serious note I know you want me
00:05:56.720 to get in and start whipping out alt
00:05:57.960 coins like this and start start making
00:06:00.160 20x [ __ ] coins rain from Bad Hollow
00:06:02.520 right here we need to talk but unlike
00:06:04.280 other crypto channels I want you to
00:06:06.520 actually succeed and what I'm about to
00:06:08.520 tell you at the beginning of this video
00:06:10.360 is a going to make you so much more
00:06:12.759 successful when it comes to trading
00:06:13.960 altcoins going to prevent you from
00:06:15.960 losing all your money which is really
00:06:17.440 the goal here because 95% of people in
00:06:19.520 crypto like I said do not make money
00:06:21.520 please read the disclaimer at the bottom
00:06:23.360 of this video I'm not going to make the
00:06:24.720 two three minute warning like I do in
00:06:26.199 other videos we have stuff to do I
00:06:28.000 cannot stress how risky and how gambling
00:06:30.400 what we're about to do is and at 95% of
00:06:32.440 you if you're new here are probably
00:06:33.520 going to lose money please read the
00:06:34.800 disclaimer in detail go through it I'm
00:06:36.680 not kidding add a character just please
00:06:38.599 read it it's very important it's not
00:06:40.199 some typical legal disclaimer where
00:06:41.960 people just throw it out there just to
00:06:43.039 cover their butt it is actually a broken
00:06:45.199 down warning for me on what you need to
00:06:46.759 be looking forward and the risk you're
00:06:47.880 about to take because I don't want you
00:06:49.120 to lose all your money and also to
00:06:50.960 maximize your gains and know when to
00:06:52.919 sell these coins I'm going be talking
00:06:54.599 about here whether you look at the coins
00:06:55.840 that I'm looking at or you use like a
00:06:57.720 smart person the concepts I give you in
00:06:59.800 this video you're not going to know how
00:07:01.560 to maximize those gains and win the exit
00:07:03.479 without what I'm about to tell you at
00:07:04.400 the beginning of this video so this is
00:07:05.319 so damn incredibly important please wait
00:07:07.240 and go through what I'm about to say
00:07:08.960 because it's going to set you up to have
00:07:09.960 success far more than just skipp into
00:07:11.599 the end of this video and looking for
00:07:12.639 coin picks which is what 90% of people
00:07:14.560 do let's talk about what's happening in
00:07:15.919 the market and what's about to happen
00:07:17.440 that's very very important so I'm sure
00:07:19.680 you've probably all seen that Bitcoin
00:07:21.400 has been charging like a wild ape and
00:07:24.000 what I've been seeing all over crypto
00:07:25.680 Twitter and all over the place is people
00:07:27.080 being kind of a little bit pissed off
00:07:29.319 that their altcoins aren't pumping so if
00:07:31.080 we go and look at pen it again to remind
00:07:33.840 us how poor we are if we go and look at
00:07:35.440 all the altcoins salana hasn't done like
00:07:37.800 a 200% move Dogecoin has because
00:07:40.720 apparently we we just all invest only in
00:07:42.720 meme coins now and this is the only
00:07:44.840 source of making money in crypto just
00:07:46.840 kidding I I'll get in the meme coins
00:07:48.199 here in a second this I know it's
00:07:49.720 tempting to want to fomo completely in
00:07:51.440 the meme coins at this point but I don't
00:07:53.000 think that's the move right now I think
00:07:55.080 alt season's about to begin and I'll
00:07:56.879 explain why but if you see and we look
00:07:58.440 at our our good old fashion utility and
00:08:01.000 and altcoins they haven't pumped super a
00:08:03.319 lot I mean Karo if you actually go look
00:08:05.240 at this thing it is it is done it went
00:08:07.080 from 30 to 60 it's almost done 100% move
00:08:09.080 so we're seeing some gains but not those
00:08:11.080 crazy gains that we want to see yet and
00:08:13.240 the reason why everybody's so soggy
00:08:15.080 about this is because apparently I'm
00:08:16.720 going to have to re-educate you guys on
00:08:18.080 how the Bitcoin and a Bitcoin and
00:08:19.960 altcoins move in a bull run and if
00:08:21.720 you're new to this you have to
00:08:23.199 understand this because this rotation
00:08:24.440 I'm about to talk about here is what
00:08:25.759 we're probably going to see two three
00:08:27.560 maybe even four times this bull run and
00:08:29.599 if you're not prepared and you don't
00:08:30.680 recognize this this rotation you're
00:08:32.519 going to keep doing the number one
00:08:34.279 mistake that everybody does it's it's
00:08:36.120 where basically something's pumping you
00:08:38.039 jump into that you try and make money
00:08:39.599 with that and then it stops pumping as
00:08:41.360 soon as you get in and other things
00:08:42.479 start pumping and then you sell that
00:08:43.799 thing and you hop in and try and Chase
00:08:45.040 these things and you end up chasing
00:08:46.560 pumps in crypto the way you make money
00:08:48.880 is you have to get in coins a few weeks
00:08:51.600 before people get into them in a bull
00:08:53.120 run now the best thing to do is what
00:08:54.880 we've been doing the past four years you
00:08:56.360 can go through I've made four years of
00:08:57.680 literal content talking about coins we
00:08:59.440 should be looking at and the industries
00:09:00.640 we should be looking at the best way to
00:09:01.920 make money in crypto is just to buy
00:09:03.560 during those times you it's really high
00:09:05.839 risk to be hopping into the middle blow
00:09:07.519 run or to start of a blow run and then
00:09:09.079 trying to chase down pumps and coin the
00:09:11.920 good news is that alts and smaller coins
00:09:15.920 really haven't started moving yet and
00:09:18.399 Bitcoin is doing its typical dump after
00:09:20.480 it makes a charge and so they're even a
00:09:22.560 little bit in a fearful down state right
00:09:24.399 now I truly think this is probably one
00:09:26.360 of the last times you're going to be
00:09:27.279 able to get alt at anywhere near a
00:09:28.760 decent price that you can sit on for the
00:09:30.399 rest of the bull run which is what we
00:09:31.720 want to do on this channel and 99% of
00:09:34.839 people watching this we are not Traders
00:09:36.760 we're not going to be pulling some Wolf
00:09:37.880 of Wall Street swing trades what we want
00:09:39.720 to do is we want to find good altcoins
00:09:41.959 that we can sit in for the next four
00:09:43.279 months and do nothing not trade not
00:09:45.160 anything and then take profits as they
00:09:48.000 go up once Bitcoin reaches a certain
00:09:50.240 point which I'll get into in this video
00:09:52.040 that's our goal and our last chance to
00:09:53.800 easily do that I think is right now so
00:09:56.240 what you need to get is the typical
00:09:58.320 Bitcoin rotation in crypto that
00:10:00.360 everybody seems to be forgetting so let
00:10:01.920 me give you a little recap on this the
00:10:03.600 way a bull market usually works if you
00:10:05.839 look at the last three bull markets and
00:10:07.480 it's working exactly the same way right
00:10:09.279 now is Bitcoin is always going to move
00:10:11.600 first I can explain to you the theory
00:10:13.360 and logic behind all this but that's a
00:10:14.839 completely other different video if you
00:10:16.720 want the whole actual fundamentals of
00:10:18.360 how crypto works by all means there's
00:10:19.920 plenty of videos on this channel about
00:10:21.600 that there's even an entire video that
00:10:22.920 I've linked below here that breaks down
00:10:24.480 how to trade small midcap coins I'm
00:10:26.800 going to leave a lot of the theory out
00:10:27.880 of this cuz I know you just want to get
00:10:29.000 into the oh my the the pomp that we
00:10:32.120 screamed about at the beginning of this
00:10:33.240 video so trust me we'll get to that in a
00:10:34.760 sec but you have to understand Bitcoin
00:10:36.399 moves first it's the king of crypto all
00:10:38.800 of crypto every coin moving right here
00:10:41.279 revolves around Bitcoin this isn't the
00:10:42.800 stock market where we have coins moving
00:10:44.399 individually everything moves based on
00:10:46.360 bitcoin and so when Bitcoin is doing
00:10:48.360 these ginormous moves all coins the
00:10:50.839 coins that we're really looking to make
00:10:52.160 money in here especially the mid and
00:10:53.560 lower caps we're going to talk about
00:10:54.920 they're probably they're they're going
00:10:56.320 to go up a little bit or they're even
00:10:57.600 going to Sag why is this it's because
00:10:59.600 everybody's watching Bitcoin and all the
00:11:01.079 liquidity is going in the Bitcoin and
00:11:03.000 really we're not going to see these
00:11:04.120 coins start to move a lot until Bitcoin
00:11:06.760 Finds Its Foundation or plateaus and
00:11:09.079 hangs out and so we're going to see is
00:11:11.040 likely what we're seeing right now
00:11:12.279 bitcoin's pumped a whole lot and now
00:11:13.839 it's going down and people are waiting
00:11:15.560 to see if it starts another charge up
00:11:17.360 and as soon as Bitcoin goes down a
00:11:19.360 little bit and then plateaus and slowly
00:11:21.440 declines we're going to see in this
00:11:23.480 period of time right here altcoins and
00:11:26.320 midcaps I can't spell alt once the word
00:11:29.000 gets past two letters it's really Beyond
00:11:30.920 me we're going to see ults start to run
00:11:33.920 very hard and what's going to happen
00:11:35.240 with ults is we're going to start at the
00:11:37.800 top Al we're going to see salana we're
00:11:39.680 going to see C sui so that's what that's
00:11:44.120 we're to call it cor for now SE all
00:11:46.560 right that's that's going to be a joke
00:11:48.079 that sticks on our Channel I took all my
00:11:50.160 life saving I invested SE all right I
00:11:52.480 don't I don't know how to pronounce the
00:11:53.440 coin I don't even know much about it but
00:11:54.920 it's going to pump super hard we're
00:11:56.360 going to see coins like n we're going to
00:11:57.560 see top coins all start to move and then
00:11:59.880 we're going to see the money start
00:12:01.000 flowing down into the smaller coins
00:12:05.079 primarily sectors of the industry that
00:12:07.200 are really hypey right now those being
00:12:09.200 real world assets which I'm going to
00:12:10.920 talk about a little bit in this video I
00:12:12.279 haven't talked about too much but I
00:12:13.279 think that's the Hidden Gem that people
00:12:15.440 are not looking at it's going to be AI
00:12:17.360 it's going to be gaming and then I think
00:12:18.720 we're going to see a lot of money move
00:12:20.240 in the meme coins so you're really going
00:12:21.959 to want to look into that video if if
00:12:23.880 you're looking to go hard in meme coins
00:12:25.519 right now what's going to happen is what
00:12:26.920 I just described Bitcoin is going to
00:12:28.560 then plateau money's going to roll in
00:12:30.160 alt and it's going to work its way down
00:12:31.959 to these smaller outs it's going to
00:12:33.399 start the ones that are worth many
00:12:34.560 billions work its way down to the ones
00:12:36.079 that are worth just a billion and then
00:12:37.399 work it down to these smaller ones that
00:12:39.560 are sub 1 billion that we're going to be
00:12:41.320 talking about in this video and that's
00:12:42.560 where the 20 30xs over the course of the
00:12:44.839 BL run are going to come from this point
00:12:46.560 now look you could have just bought
00:12:48.040 salana after the FTX crash we were
00:12:50.440 talking about it then I didn't so much
00:12:52.040 get into salana here but this has made a
00:12:53.839 clean 20x almost or at least a 15x since
00:12:56.880 it crashed that's the benefit of buying
00:12:58.760 early for example you could have got in
00:13:00.279 the super last November when we were
00:13:01.920 talking about it and this thing went all
00:13:04.000 the way up to a5x recently when we
00:13:06.440 talked about and we could just sit in
00:13:07.680 super nice and comfy now so that's the
00:13:09.720 that's the way to get those 203x in
00:13:11.519 crypto what we have to do now to get
00:13:13.240 these 2030 XS is we have to beat people
00:13:15.639 to these smaller coins right here so
00:13:17.920 everybody in crypto is looking here and
00:13:19.600 they're looking at meme coins right now
00:13:21.360 the way we win here is we have to beat
00:13:23.360 where people are going to be next and
00:13:24.440 it's going to be right here so before we
00:13:27.040 actually get into those coins and then
00:13:29.120 indries you should be looking at you
00:13:30.160 have to understand there's going to be
00:13:31.880 this rotation multiple times in the
00:13:33.519 boring what we're likely going to see
00:13:34.720 right here bitcoin's going to go up it's
00:13:36.160 going to Plateau like it is right now
00:13:37.680 alts are going to start to move super
00:13:39.120 hard because money's going to move out
00:13:40.320 of Bitcoin this money we saw taken out
00:13:42.120 right here it's going to move out of
00:13:43.480 Bitcoin and then go into these alts also
00:13:45.880 we see tons and tons of retail flooding
00:13:48.160 in right now I'll have my editor put up
00:13:49.639 the search volumes but the last 6 months
00:13:52.120 we've seen interest in crypto at alltime
00:13:53.839 lows Bitcoin was sitting at
00:13:55.920 $67,000 and no one was searching for it
00:13:58.360 it has not been until this last week
00:14:00.240 that people have actually started
00:14:01.240 searching and looking in the Bitcoin and
00:14:03.000 crypto again what all these people are
00:14:04.440 going to do is they're going to see
00:14:05.199 these gains in crypto and they're see
00:14:06.759 the gains in Bitcoin and they're going
00:14:08.040 to say what's next and so they're going
00:14:09.759 to come in and they're going to actually
00:14:11.040 start researching these top coins right
00:14:12.839 here as they start making money in these
00:14:14.399 coins they're going to get addicted to
00:14:15.839 crypto and start moving down to the
00:14:17.079 higher riskier coins they're going to be
00:14:18.639 do what is called the Newbie Shuffle so
00:14:20.720 for example my first blow I got in and I
00:14:22.720 primarily just owned Bitcoin in ethereum
00:14:24.759 and those pumped I'm like hm well I
00:14:26.560 bought Bitcoin in ethereum I must be
00:14:28.199 really smart I I can trade these smaller
00:14:30.279 coins and then they come in uh and get
00:14:32.160 absolutely washed like I did early in my
00:14:34.079 crypto career trying to trade these
00:14:35.720 coins right here but that's fine cuz
00:14:37.320 you're watching this video and you're
00:14:38.279 still semi- early to the run so we're
00:14:39.959 going to be the ones doing the washing
00:14:41.199 here we're not going to be the ones
00:14:42.399 getting our butts rubbed by creepy
00:14:44.120 crypto veterans we're going to be the
00:14:45.440 runes the one ones rubbing ass here but
00:14:48.199 what you need to know and be prepared
00:14:49.360 for is part of this rotation is Bitcoin
00:14:51.519 taking a big dive in my opinion I don't
00:14:53.560 think we're going to break 100K on this
00:14:55.639 pump right here I don't think we're
00:14:56.680 going to see that till later this year
00:14:57.920 what we're likely to see is Bitcoin now
00:15:00.000 hover between 80 I I'm throwing these
00:15:02.920 numbers out arbitrarily I don't try to
00:15:04.600 do TA or the graphs or anything like
00:15:06.360 that because I think that's pointless
00:15:07.959 what we're going to do or what we're
00:15:09.480 going to see is likely Bitcoin hitting
00:15:11.519 down to maybe 83,000 whatever and then
00:15:14.160 bobbing between here $90,000 it's just
00:15:16.440 going to plateau and get very boring
00:15:18.000 then we're probably going to see a few
00:15:19.560 weeks to maybe even a month of all it's
00:15:21.199 going nuts and Bitcoin doing absolutely
00:15:22.839 nothing then we're probably going to see
00:15:24.480 Bitcoin take an absolute dive to put
00:15:26.880 this in perspective for you if we go
00:15:28.240 look at the last book run right here you
00:15:29.959 can see when Bitcoin made its first
00:15:31.519 Power dominant move its first Power top
00:15:33.759 move it really started laying that pipe
00:15:36.560 and this was actually not so much when
00:15:38.880 people really started to get into it it
00:15:40.079 was about right here okay and this looks
00:15:42.680 like a very short period of time but it
00:15:44.199 wasn't it it it came through it pumped
00:15:46.759 up and then it slowly went up to the
00:15:48.319 30,000 and it hovered around here and if
00:15:50.639 we look at this date from its peak which
00:15:52.600 was 18 2021 and then just look at
00:15:55.240 ethereum which I believe salana is very
00:15:58.079 closely mimicking ethereum's Behavior
00:16:00.279 last Bull Run you can see when it went
00:16:02.480 and made its first pop up so this was
00:16:04.319 the dominant move right here you can see
00:16:06.319 it was actually almost a month after
00:16:08.519 Bitcoin made its first high right here
00:16:10.560 so you can see this is 115 2021 this is
00:16:14.240 when it made its first little pump right
00:16:15.480 here and what we saw ethereum do is it
00:16:17.440 waited a full month almost before it
00:16:19.720 made its peak and so that's probably
00:16:21.160 what we're going to see right here
00:16:22.160 everyone's like why is an ethereum and
00:16:23.399 all these things moving well one the
00:16:24.519 reason we're not seeing ethereum move is
00:16:26.040 cu it sucks buying a a coffee with
00:16:28.199 ethereum cost you $30 in transaction
00:16:30.319 fees right now it's not really feasible
00:16:31.720 in the real world but that doesn't
00:16:33.120 matter this is crypto the reason we're
00:16:34.720 not seeing ethereum and all these things
00:16:35.880 move is because it's doing the same
00:16:37.160 thing it did last bll run and so we want
00:16:39.319 to for example we're right here you can
00:16:41.440 see this is the point when Bitcoin was
00:16:43.759 really making its run up right here this
00:16:45.800 one six point this is when Bitcoin was
00:16:47.800 really moving we want to move into this
00:16:49.880 point right here in altcoins and then
00:16:51.800 beat it right here this is where we're
00:16:52.959 going to make our first gains at and
00:16:54.360 we're going to see very outleveled gains
00:16:57.440 very huge returns if we get in the coins
00:16:59.639 lower than this so if we go and look at
00:17:01.160 for example uh let's go look at B&B this
00:17:03.399 is example of what we're trying to do
00:17:05.119 right here we're going to go look at the
00:17:06.319 last Bull Run and you can see here's
00:17:08.520 where Bitcoin was peaked at all right so
00:17:10.599 this is when Bitcoin was pumping hard
00:17:12.640 then what happened is ethereum moved and
00:17:14.400 then you can see this is after
00:17:16.480 ethereum's Peak right here you can see
00:17:18.000 it B&B absolutely shot up crazy amounts
00:17:20.880 it went up from $30 to $200 like that
00:17:24.839 and so we're not really looking to ride
00:17:26.119 the ethereum like waves we're looking to
00:17:27.839 ride this wave right here and the way we
00:17:29.760 do that is by predicting this rotation
00:17:31.520 and getting into people before they buy
00:17:33.360 the B&B like coins that we're trying to
00:17:34.919 buy right here this is a strategy this
00:17:36.760 is what we're doing and if you want more
00:17:38.360 updates on this you want this sooner
00:17:39.720 follow me on Twitter at zss Becker now
00:17:41.880 the last thing I'm going to give you
00:17:43.240 with this is that you have to be able to
00:17:45.080 be patient here and you have to be able
00:17:47.320 to hold through some stress and pressure
00:17:49.360 now I want to be completely transparent
00:17:51.480 I think a lot of the coins we talk about
00:17:53.160 on this channel specifically right here
00:17:54.679 if it's not these top coins right here
00:17:56.440 they're all likely going to zero and by
00:17:58.400 zero I don't mean absolute zero but
00:18:00.200 we're probably going to see the exact
00:18:01.640 same sell-offs in a much bigger way than
00:18:03.760 we saw last B on I not suggesting that
00:18:05.799 you long-term hold or view any of these
00:18:07.799 as big lifelong Investments or even safe
00:18:10.440 Investments what we're doing on this
00:18:12.200 channel particularly the coins we're
00:18:13.360 about to get into later on this video
00:18:14.840 These are hardcore gambles I fully
00:18:17.200 expect 10% of these to probably nuke in
00:18:20.039 the middle of the bull run I expect
00:18:21.919 almost all these especially ones later
00:18:23.440 in the video to take massive 80 90% dips
00:18:26.799 so if you're not looking at this and
00:18:28.400 timing this right here by the end of the
00:18:29.840 Run you're going to lose a substantial
00:18:31.919 amount of your money especially if
00:18:33.280 you're buying later in The Bu run or you
00:18:34.840 buy after these pumps this is where
00:18:36.240 everybody gets killed that so please I
00:18:37.880 have to stress I'm going to focus on a
00:18:39.799 little bit more lowrisk stuff at the
00:18:41.400 start of it when I start talking about
00:18:42.440 coins if you haven't been in crypto for
00:18:44.360 a while I'm saying like dude just just
00:18:46.720 focus on the lower risk stuff that I
00:18:48.360 talk about it's all massively risky
00:18:50.200 these are all going to take massive
00:18:51.159 Dives even the best coins like Solano
00:18:53.159 went down 90% so please I stress when I
00:18:56.120 talk about holding here I'm not
00:18:57.840 suggesting you look at these like stocks
00:19:00.320 I'm not suggesting that I've picked the
00:19:02.039 most magical best new technology and I'm
00:19:04.280 going to hold it to the Moon with you
00:19:05.600 and we're all going to make money
00:19:06.559 together these are extremely risky [ __ ]
00:19:09.039 coins they're going to pump super hard
00:19:10.960 and everyone including me is going to be
00:19:13.159 looking to super turbo dump all these
00:19:15.559 coins when we start getting around these
00:19:16.880 levels right here and if you've looked
00:19:18.360 at my mem coin selling video you know
00:19:19.919 I'm going to be selling and start
00:19:21.120 selling my coins more so when we're
00:19:22.760 about like right here with that in
00:19:24.480 context please listen to my advice right
00:19:26.440 here you're going to have to be patient
00:19:28.360 with the these moves cuz the way you
00:19:29.559 make money in the Bull Run is you have
00:19:30.960 to sit here and squat in things for a
00:19:32.679 while okay bitcoin's moving right now
00:19:34.799 and everybody's getting really upset
00:19:36.000 that their alts aren't moving and so
00:19:37.159 they're really Panic moving in the memes
00:19:38.760 and Bitcoin okay and they're trying to
00:19:40.440 chase meme pumps after the coin's
00:19:42.320 already pumped this is a losing
00:19:43.880 situation right here because you're
00:19:45.240 chasing pumps instead of waiting for
00:19:46.919 pumps to come to you waiting for pumps
00:19:49.080 involves a period of being soggy and not
00:19:51.080 making money which is why everybody's
00:19:52.520 all upset right now with their alt in
00:19:54.039 utility coins don't worry it's going to
00:19:56.120 probably happen you also have to
00:19:57.799 understand you're going to have to hold
00:19:59.120 through some really ugly dumps on the
00:20:01.039 way up to the top now there's a really
00:20:03.120 classic picture which I'll I'll have my
00:20:04.640 editor put up on the screen right now of
00:20:06.400 how many times Bitcoin dumped on the way
00:20:08.240 to its top in 2021 and even 2017 you're
00:20:11.799 going to see multiple 20% 30% haircuts
00:20:15.400 on bitcoin on the way up we might not
00:20:17.039 see that level of volatility since we
00:20:18.600 have so much big money in Bitcoin now
00:20:20.400 but we're 100% going to see some types
00:20:22.159 of dumps and we're going to see that
00:20:23.240 reflected in ethereum and we're going to
00:20:26.120 see salana and these other coins
00:20:28.000 probably take and I I think altcoin is
00:20:29.640 going to move based on ethereum and
00:20:31.000 salana take huge dumps and if you look
00:20:34.320 at the last blow runs if you sold on any
00:20:36.000 of these dumps you pank sold you got
00:20:37.760 absolutely rocked so I'm not going to
00:20:39.480 zoom in and go through all the hoopla
00:20:40.840 again but in my first Bowl I was holding
00:20:43.720 ethereum and a lot of alt I bought right
00:20:45.720 here okay and then Bitcoin went up here
00:20:48.760 it went to 30 thou or 40,000 and then
00:20:50.760 dumped all the way it it touched to
00:20:52.640 about 28,000 for a second it's very
00:20:55.240 scary if you've never experienced these
00:20:57.159 before I was I thought was about to lose
00:20:59.600 everything I was terrified and so of
00:21:01.120 course like an idiot I just tried to
00:21:02.640 sell everything right here and I was
00:21:03.840 doing the whole beginner Shuffle where
00:21:05.760 everybody logs in the coinbase and tries
00:21:07.320 to send out all their coins and sells
00:21:08.760 them for idiot prices all the smart
00:21:10.640 people then come in and buy and it goes
00:21:12.559 up again so my advice is we're probably
00:21:14.240 going to see one of these dumps now
00:21:16.200 could this possibly be the top of the
00:21:17.840 market right now it could be I don't
00:21:19.799 know on this channel I'm not trying to
00:21:21.960 act like I can I can predict the future
00:21:23.720 like every other channel they can't then
00:21:25.760 they Allure and put all their viewers in
00:21:27.480 a false sense of security that they know
00:21:29.240 what's going to happen and then it
00:21:30.279 doesn't happen everyone gets rocked all
00:21:32.039 I'm doing is I'm looking at other bull
00:21:33.440 runs and making really General stupid
00:21:35.600 person rules on what's about to happen
00:21:37.279 what is most likely to happen based on
00:21:38.880 my stupid person rules is we're going to
00:21:40.320 go up and we're probably going to see a
00:21:41.520 really bad dump before 100K in my
00:21:44.279 opinion Bitcoin at 100,000 is very
00:21:46.760 similar to bitcoin at 50,000 last run
00:21:49.000 before we make that 100,000 charge we're
00:21:50.600 going to see a really nasty dump and
00:21:51.960 people are going to conclude the bull
00:21:53.039 market is over I'm going to hold to that
00:21:55.760 I'm expecting it to come I'm just not
00:21:57.480 going to sell and I'm going to hope to
00:21:59.400 Lord peut painon sane of Magnum dongs
00:22:02.000 that that's not the top of the run if
00:22:03.679 it's not I'm screwed I'm going to lose
00:22:05.440 all my money if you hold through that
00:22:06.679 you're screwed you're going to lose all
00:22:07.600 your money it's just that simple it's a
00:22:09.120 roulette table we're taking a gamble
00:22:10.640 here but you're going to have to hold
00:22:12.000 through some really painful periods in
00:22:13.679 altcoins if you want to ride them to the
00:22:15.159 Top If you're new to this or you're not
00:22:16.559 a professional Trader you're not going
00:22:17.600 to swing trade these things to Victory
00:22:19.679 so what we're going to have to do is
00:22:20.600 we're going to have to hold and we're
00:22:21.840 have to wait for this entire cycle that
00:22:23.480 I just talked about here to reset we're
00:22:25.360 probably going to see this cycle reset
00:22:27.000 two to three times I'm probably going to
00:22:28.880 start selling after the first cycle and
00:22:31.200 I'm going to be selling all the way up
00:22:32.360 and all the way down I'm not going to
00:22:33.760 try and time the top and if you're
00:22:35.120 interested in how that works watch my my
00:22:37.120 smaller coin trading video so that's a
00:22:38.919 full recap on what's about to happen
00:22:40.400 since you're actually prepared to manage
00:22:42.679 this now let's get into the part you've
00:22:45.039 all been waiting for the coins so in
00:22:47.000 this video I'm going to be focusing on
00:22:49.080 more of the bigger coins in each of
00:22:50.720 these sectors because I know there's a
00:22:52.120 ton of new people flooding this channel
00:22:53.960 I don't think the first video we should
00:22:55.360 come back with while the bull runs
00:22:56.640 confirm is some big small tiny alt coin
00:22:58.960 video I will be making videos like that
00:23:01.279 next week we will have an AI video we
00:23:03.240 have a gaming video we have a real world
00:23:04.960 assets video we'll have a mem coin video
00:23:06.840 and I will hint at some juicy coins in
00:23:09.080 this video but I want to give you the
00:23:10.600 overview of where the look and how to
00:23:12.120 look at it because my goal here in this
00:23:13.880 video is absolutely nothing for you I
00:23:16.120 going to tell you shrip the best thing
00:23:17.400 to do is does not touch this you're
00:23:18.960 probably going to lose all your money
00:23:20.279 that's my number one advice but you're
00:23:21.640 not going to listen to that that's not
00:23:23.000 why you're viewing this channel you are
00:23:24.320 here to put your dick in a pencil
00:23:25.520 sharpener with me and hope that no one
00:23:27.360 plugs it in you're here to be to
00:23:28.679 generate you're here to gamble and so by
00:23:30.400 all means if you want to put your dick
00:23:31.640 in the pencil sharpener with me and do
00:23:33.400 the Macarena all cocky like and hope
00:23:35.000 that doesn't come to some bloody Stumpy
00:23:36.799 End by all mean let's do it but my
00:23:38.480 number one advice for you is don't trade
00:23:40.360 crypto now my goal with this coin video
00:23:42.960 is Mor show give you coins are going to
00:23:45.200 score 5 to 10 X's with minimal chance of
00:23:47.919 them rugging AK not exploding if you get
00:23:51.000 into a lot of the smaller coins we're
00:23:52.320 I'm talk about in later videos these
00:23:54.039 coins not only come with the challenge
00:23:56.080 of having to trade them and recognize
00:23:57.840 the extreme vol ility a lot of them will
00:23:59.640 also just implode the projects will fail
00:24:01.919 they'll get hacked a few of them are
00:24:03.559 rugged this is just what happens when
00:24:05.039 you get into smaller cap coins so I
00:24:06.960 really don't want to set up people just
00:24:08.600 new to this watching this with those
00:24:10.120 type of coins if you want to see those
00:24:11.480 type of coins I do talk about them a
00:24:13.120 little bit on my Twitter what I want to
00:24:14.440 do is I want to give you the areas you
00:24:15.720 need to be looking at right now the
00:24:17.279 first place I'm going to tap into in
00:24:18.799 this video and the reason why I'm
00:24:19.640 sharing it first is because I haven't
00:24:20.840 researched this place in crypto as much
00:24:22.720 as I think I should and so everybody's
00:24:24.559 super duper focused on Meme coins right
00:24:27.159 now and I'll talk about meme coins here
00:24:28.200 in a SEC but the place that I think is
00:24:29.760 completely being overlooked and is going
00:24:31.320 to attract so much like institutional
00:24:33.679 money real money coming in is going to
00:24:35.559 be real world assets so what you have to
00:24:37.440 understand is a lot of people are
00:24:38.440 looking at meme coins right now and
00:24:39.960 flooding into those I think meme coins
00:24:41.960 are going to do super duper well a lot
00:24:43.360 of people hate meme coins so they suck
00:24:44.720 up liquidity and all this kind of stuff
00:24:46.480 that's technically true but almost
00:24:48.120 everything in crypto is technically a
00:24:49.880 meme coin none of these coins or
00:24:51.760 technology do anything at this point I
00:24:53.559 think crypto is going to take over the
00:24:55.000 world I think it's going to be one of
00:24:55.960 the most important Technologies I think
00:24:57.320 it's going to be used in literally
00:24:58.760 almost everything video games banking
00:25:00.760 transactions how we vote that being said
00:25:03.360 there is a lot of hyper in us and we're
00:25:04.679 looking at a DOT situation right here
00:25:06.600 like in the do com boom most of the
00:25:08.520 companies launching didn't actually do
00:25:10.480 anything and that's taken to the most
00:25:12.000 tensest degree in crypto because you can
00:25:14.279 launch a coin and start taking in people
00:25:16.760 buying them with zero doing nothing you
00:25:19.039 can L just type in a little bit of code
00:25:21.000 and boom you have a coin and you can say
00:25:22.399 oh I'm doing something it's a great way
00:25:23.960 to raise money it's a great way to make
00:25:25.760 money and because of that we just have
00:25:27.760 coins that that do mostly nothing
00:25:29.360 launching all over the place so please
00:25:30.679 don't ever mistake my my intent on these
00:25:33.200 videos I think almost every coin in
00:25:34.600 crypto is vaporware I think they're all
00:25:36.960 meme coins and what I'm looking for in
00:25:38.640 crypto is not some gamechanging
00:25:39.880 technology I'm looking for pump the
00:25:41.559 metals I'm trying to find coins that
00:25:43.320 have the right narrative the right
00:25:44.760 attention and the right interest that
00:25:46.520 will make them go up a lot of coins that
00:25:48.360 go up and pump in bull runs do
00:25:49.960 absolutely nothing so that's why I don't
00:25:51.559 really hold any resentment towards mem
00:25:53.200 coins and I've been getting into a
00:25:54.399 little bit of Mage myself we are going
00:25:56.200 to see actual adoption start and what
00:25:58.440 focusing on this video is where the
00:25:59.840 adoption is actually going to be we are
00:26:01.520 going to see a lot of big institutional
00:26:03.200 money move in the crypto with an
00:26:04.799 investor mindset this means they're
00:26:06.120 going to be wanting to invest in
00:26:07.120 technology it's going to be big in the
00:26:08.159 future I don't think we're going to see
00:26:09.880 huge investors or people with their
00:26:11.399 401ks or people with a lot of money
00:26:13.559 moving in and wanting to get into meme
00:26:15.640 coins meme coins are kind of a
00:26:17.360 phenomenon that we're going to see Ultra
00:26:18.960 beginner people get into and Ultra
00:26:20.880 low-level retail get into and we're
00:26:23.360 going to see crypto natives or ogs
00:26:25.640 getting into this is why you saw
00:26:26.640 memecoins doing crazy gains during the
00:26:28.440 bare Market because it's something
00:26:30.240 that's kind of reserved for the crypto
00:26:32.039 community so what I want to do is I want
00:26:33.720 to beat the actual investors I want to
00:26:35.760 beat the people that are going to have
00:26:37.720 100,000 200,000 are going to be moving
00:26:39.399 into the crypto because they actually
00:26:41.039 want to invest it long term where are
00:26:42.919 they going to invest these things I
00:26:44.440 think the top place you're going to
00:26:45.360 invest these things is real world assets
00:26:47.200 this is crypto that manages and controls
00:26:49.559 the distribution of assets so I think in
00:26:52.159 the future for example something that's
00:26:53.480 going to be really huge is we're going
00:26:54.399 to do all of our real estate contracts
00:26:56.360 via crypto if you've ever looked you
00:26:58.440 ever bought a house it's a disaster you
00:27:00.080 could easily do the transaction by
00:27:02.520 transfer of of an nft to one person to
00:27:05.200 another and it's managed via blockchain
00:27:07.279 and they pay for it via dollars on the
00:27:09.360 blockchain I think that's going to be
00:27:10.600 something that's absolutely huge the
00:27:11.840 ownership of cars the ownership of
00:27:13.480 houses how we vote Distributing shares
00:27:15.960 of a real estate portfolio I think stuff
00:27:17.840 like that's going to be absolutely huge
00:27:19.320 and I think real world assets is going
00:27:20.679 to be where it's the most Huges at
00:27:22.960 because that's exactly what I just
00:27:24.279 described and so I think we're going to
00:27:26.000 see so much money flood into these and
00:27:28.360 I'm researching these right now I might
00:27:29.919 make a real world assets video I'm
00:27:31.960 telling you this right here is really
00:27:33.919 easy for mainstream investors to
00:27:35.799 understand and I think this is where a
00:27:36.720 lot of money is going to flood into so
00:27:38.679 what I would do is I'd take the logic
00:27:40.000 I'm about to show you in these other two
00:27:41.240 niches and apply it here because you can
00:27:43.159 find a lot of coins that are being
00:27:44.679 completely ignored right now I think
00:27:46.399 this is a niche to actually research in
00:27:48.039 it's being completely overlooked I'm
00:27:49.360 going to be digging into it a lot over
00:27:50.559 the next few weeks now backing up a bit
00:27:52.640 to actual coin picks if I was building a
00:27:54.880 portfolio of altcoins and I really
00:27:57.200 didn't know what I was doing and I just
00:27:59.200 wanted to sit and be dur dur this is
00:28:01.360 what I would do so if I'm going to build
00:28:02.880 the most basic portfolio for somebody
00:28:04.679 I'm going to go and get exposure to the
00:28:06.440 main altcoins and then get top exposure
00:28:08.640 to the top altcoins and these niches I
00:28:10.799 think are going to pump super hard so
00:28:12.519 where I would start at is I would just
00:28:13.679 start at salana I wouldn't add ethereum
00:28:15.320 to my portfolio I think ethereum is
00:28:17.279 going to do similar gains to bitcoin
00:28:18.960 except Bitcoin has so much more security
00:28:21.960 and long-term success almost guaranteed
00:28:25.039 to it that ethereum just doesn't have I
00:28:26.960 can make an entire video trashing
00:28:28.519 ethereum I'm not going to do that it
00:28:30.360 would just waste everyone's time there's
00:28:31.960 no point to that video I just think you
00:28:33.919 know ethereum if ethereum does a 2X
00:28:35.760 Bitcoin is going to do like a 1.7x and I
00:28:38.120 I I don't think that extra 3x is worth
00:28:41.279 the risk that comes with ethereum I just
00:28:43.360 don't now salon on other end I think is
00:28:45.240 probably going to go to at least $400
00:28:46.919 $500 people are theorizing $800 to
00:28:49.360 $1,000 I think that's totally on the
00:28:51.080 table especially if we see Bitcoin
00:28:52.880 charge past 150k which I think is on the
00:28:55.440 table I do think there is potential for
00:28:58.279 K Bitcoin that is not what my trading or
00:29:02.240 uh strategy revolves around I'm I'm I've
00:29:04.559 been waiting since November I've gotten
00:29:06.919 to a lot of coins very low I'm going to
00:29:08.840 be taking profits on those well before
00:29:10.559 we get to 150k 200k bitcoin I'm not
00:29:13.080 waiting for that I am completely fine
00:29:15.440 not even coming close to the top of this
00:29:17.679 bull market you have to understand when
00:29:19.000 I talk about everything we're not I'm
00:29:20.640 not trying to hold till the tippy
00:29:22.320 tippity tip and then I could I could
00:29:24.279 take all my gains right now be very
00:29:25.960 happy but I don't think we're anywhere
00:29:27.320 close to the top right now so I think
00:29:29.279 salana that's where I would start my
00:29:30.679 portfolio with then what I would do if I
00:29:33.360 want some meme coin exposure is I would
00:29:36.399 actually add Pepe okay and if I want
00:29:39.039 some really juicy mem coin exposure I
00:29:41.760 would actually add peanut okay that's
00:29:44.799 where I would start with and I wouldn't
00:29:46.120 put a lot of money into those but I
00:29:47.600 think peanut could have the chance to be
00:29:49.440 like a shib and I think Pepe is going to
00:29:52.320 give phenomenal meem coin gains and I
00:29:54.360 think it's probably going to get up you
00:29:55.640 know probably if if we see a meme coin
00:29:57.559 run probably a $3 billion market cap so
00:29:59.519 that's why I would that's why I would
00:30:00.600 stay in meme coins if I was a now an
00:30:02.799 actual coins I would throw in there I
00:30:05.080 hate I hateing saying this this makes my
00:30:08.240 skin crawl but I think cardono is
00:30:11.080 probably going to go back up to its old
00:30:12.960 all-time high which is probably about
00:30:14.600 almost a 5x from here I've been dogging
00:30:16.600 on these guys for four years straight um
00:30:19.440 since I told them to sell at $3 they all
00:30:22.080 viciously attacked me and then I got to
00:30:23.760 troll them I got the pleasure the honor
00:30:26.240 of calling a coin at its abs absolute
00:30:28.279 picky tippity tippity top and being able
00:30:30.519 to troll the people that made fun of me
00:30:32.120 for four years straight look we're in a
00:30:33.600 bull market right now cardano has a lot
00:30:35.960 of attention Charles hoskinson is a big
00:30:38.120 name in the space he did just sign up to
00:30:40.120 tell people in the US government how to
00:30:41.399 make policy and as much as I dog cardono
00:30:44.919 holders I hate the holders they are the
00:30:46.640 worst people in life they're they're all
00:30:48.360 it's it's a coin that's exclusively made
00:30:49.919 up of Chuck-E-Cheese employees just
00:30:51.960 round little 5 foot2 5 foot1 manlets
00:30:54.720 they all ride around town on scooters I
00:30:56.240 don't know if you've ever seen a gang of
00:30:57.440 Cardon it's very intimidating just a
00:30:59.639 bunch of sweaty little Hobbits all
00:31:01.440 patrolling around town on Friday night
00:31:03.200 looking for their wives cuz they have no
00:31:04.639 [ __ ] clue where they are they're
00:31:06.000 terrifying species I don't like them
00:31:08.200 that's why I insult them and make fun of
00:31:09.600 them behind the safety of my computer I
00:31:11.960 if I saw one of these groups of men on
00:31:13.720 in real life they swarm me with their
00:31:15.279 limp little lotiony wrist and
00:31:17.120 aggressively try to Pat me down or
00:31:19.039 whatever a cardono holder considers
00:31:20.760 fighting just terrifying I'd be covered
00:31:22.440 in lotion and smell like a
00:31:23.760 Chuck-E-Cheese hot dog vendor for weeks
00:31:25.919 I don't want that to happen I'm not
00:31:27.279 leaving my house because of it that
00:31:29.039 being said cardano does a lot of things
00:31:31.799 right the technology behind it actually
00:31:33.440 works really well and so I think based
00:31:36.039 on that cardano's probably going to
00:31:37.480 shoot back up to its old alltime high so
00:31:39.320 I would actually put cardano in a newbie
00:31:41.960 portfolio now the other coin I would
00:31:43.679 throw in there is avac I think aax is
00:31:46.159 going to be the little brother to salana
00:31:47.880 and I mean when I told you about avac
00:31:49.720 last november-ish I said AAC was the
00:31:51.880 coin to watch if you want the gains
00:31:53.440 things done a clean 3x from there and I
00:31:56.440 think it it has plenty of room to charge
00:31:58.159 back to this recent all-time high right
00:31:59.679 here when I refer to all-time highs a
00:32:01.120 lot in this video I'm not going to be
00:32:02.279 referring to these all-time highs I'm
00:32:03.559 going be referring to the recent alltime
00:32:05.000 highs cuz these are a little bit more
00:32:05.960 reasonable to talk about the market caps
00:32:08.080 and our dilution of these coins are very
00:32:10.039 different at this point and so these
00:32:11.760 prices right here aren't very helpful
00:32:13.399 there was just way less ax in the market
00:32:15.440 then than there is now so I think we're
00:32:16.760 going to easily be returning back here
00:32:18.039 and I think $100 $150 maybe even a $200
00:32:20.679 aax totally on the tape I do think and
00:32:23.240 I've been calling chain link since the
00:32:24.799 dawn of time and chain link has been
00:32:26.159 disappointing since the dawn of time I
00:32:28.080 wouldn't add this to your portfolio if
00:32:29.279 you want big juicy gains but chain link
00:32:30.919 is like the most essential technology in
00:32:33.000 all of crypto I would have that in a
00:32:34.720 portfolio next we want some exposure to
00:32:38.039 Ai and gaming I have entire videos
00:32:40.480 breaking down why Ai and gaming are
00:32:42.200 going to be huge if you want to see
00:32:43.519 those they're just a link below here
00:32:44.840 it's very important you understand these
00:32:46.360 because I think these are the two first
00:32:47.840 biggest use cases in crypto besides that
00:32:50.360 real world asset situation I described
00:32:52.679 before so where I would be starting at
00:32:54.639 an AI is I would start with bit tensor
00:32:56.960 I'd start with artificial super
00:32:58.639 intelligence Alliance they did a stuff
00:33:00.440 recently really made a lot of people mad
00:33:01.919 but I think it's going to do very well
00:33:03.200 I'd also start with render what AI coins
00:33:05.360 do is they manage the infrastructure or
00:33:07.200 processes of a lot of AI servers or the
00:33:09.480 power behind AI or they manage the
00:33:11.519 streams of data so for example if you
00:33:13.440 look at a coin like Theta it streamlines
00:33:15.519 a lot of the things that YouTube and
00:33:16.880 other companies use for their video
00:33:18.679 streaming data and it streamlines that
00:33:20.679 using blockchain is just way more
00:33:22.279 efficient cheaper and it's probably what
00:33:23.679 everyone's going to use in the future I
00:33:25.000 haven't looked too much in Theta so that
00:33:26.360 might not be the most like accurate
00:33:28.399 assessment but what I just described
00:33:29.960 there is what from a 30,000 foot view AI
00:33:32.600 coins do it is such a phenomenal use of
00:33:34.960 blockchain we're all going to use in the
00:33:36.360 future that's why you want exposure to
00:33:38.320 this so those are the coins I would
00:33:39.600 start with in AI now if I'm looking to
00:33:42.519 get some exposure to gaming where I
00:33:44.799 would actually start at is avax which I
00:33:46.679 just described we saw a game off the
00:33:48.360 grid recently launched and it added more
00:33:50.320 wallets and actual real use of
00:33:52.039 blockchain over 10 million wallets were
00:33:54.039 added and people using using it to play
00:33:55.919 this game that's the most demand we've
00:33:57.279 ever seen for blockchain outside of
00:33:58.919 trading in nfts that's real world use we
00:34:01.240 are going to see almost every game using
00:34:03.360 some form of blockchain Technology
00:34:04.840 within the next 3 to four years I think
00:34:06.639 this is probably one of the better
00:34:07.720 long-term investments in crypto I think
00:34:09.359 if you're looking for mega super
00:34:11.119 high-risk crazy pumps it's going to be
00:34:12.679 mem coins but that's super hard to
00:34:14.280 predict especially if you're new I think
00:34:15.839 if you're looking for the most
00:34:17.199 consistent to predict pumpi coins in
00:34:18.960 crypto it's going to be AI coins I think
00:34:21.119 the best longterm investment that's also
00:34:22.760 going to give really good gains in this
00:34:24.040 SP run is going to be gaming and so if
00:34:26.359 you look at for example AAC our first
00:34:28.159 successful game off the grid delivered
00:34:30.320 so much volume on the Chain higher than
00:34:32.760 anything we've ever seen before we're
00:34:34.079 about to see almost every game using
00:34:35.719 this in the next 2 to three years in my
00:34:37.119 opinion and we're going to see all these
00:34:38.760 coins go nuclear from speculation
00:34:40.918 because of it now what we want to do
00:34:42.239 first is we want to look at the
00:34:43.399 technology that's going to be used the
00:34:45.320 most in gaming this is the
00:34:46.719 infrastructure that provides all the
00:34:48.159 things that all these games are going to
00:34:49.440 run in yes there's a lot of games that
00:34:50.960 are really good I'm not going to talk
00:34:52.239 about them too much in this video we'll
00:34:53.960 get into that in our gaming video I also
00:34:55.760 have a gaming video link below this
00:34:57.440 video that list all the gaming coins
00:34:59.040 that I'm in and looking at and how to
00:35:00.680 actually look at the gaming industry as
00:35:02.079 well my opinion on those those coins
00:35:04.240 hasn't changed too much since then
00:35:06.119 because this is a really long-term
00:35:07.359 investment for me so if I'm building a
00:35:09.040 more beginner portfolio where I'm going
00:35:10.640 to start at is aex aex aex aex I think
00:35:13.480 that's going to be the Big Chain that
00:35:15.160 gaming is on and that's going to drive
00:35:16.480 aex to Crazy levels next I'm going
00:35:18.240 invest in IMX and beam these are the two
00:35:20.480 most solid core fundamental
00:35:22.520 infrastructure coins and all of gaming
00:35:24.560 and if I want a little bit more exposure
00:35:26.839 to something that's on similar levels to
00:35:29.119 those but still a smaller market cap I'm
00:35:31.240 going to get in the superverse Elli and
00:35:32.920 what he's doing over there is really
00:35:33.920 special I think almost every game in the
00:35:35.599 space is using super in some form now
00:35:37.720 and then I'd also throw in Ronin which I
00:35:39.400 think is a blockchain that a lot of
00:35:40.680 games are going to be using there's a
00:35:42.040 lot of good coins right here but those
00:35:43.720 are the ones I would stick to I think AP
00:35:45.200 coins either going to do insanely well
00:35:47.000 and be the top gaming chain or one of
00:35:48.440 the top gaming chains or I think it's
00:35:49.640 just not going to do anything and that's
00:35:50.839 why I would stop with with my highle
00:35:52.440 gaming coins that's where I would draw
00:35:54.200 the line if you just put that portfolio
00:35:55.800 that I just laid out right there I think
00:35:57.200 that's going to do very very well and
00:35:58.800 none of those coins have any risk of
00:36:00.359 just nuking before the Bull Run is done
00:36:02.200 again I think a lot of coins are going
00:36:03.720 to Nuke these ones if they do nuke they
00:36:05.880 will be around in the future they will
00:36:07.599 keep going and at least you can hold
00:36:09.160 them for the next five plus years
00:36:11.160 through a bear so for example if you
00:36:13.359 held super through the bear the coin
00:36:15.480 shop and again the valuations were
00:36:17.119 different this time but you can see you
00:36:18.400 know it shot up right here it got to
00:36:20.119 these really high levels right here and
00:36:22.000 it's came right back because Elliot and
00:36:23.640 what they're doing over there is pure
00:36:24.680 quality yeah it sucks if you're going to
00:36:26.520 hold through all this right here this is
00:36:27.960 where we actually started buying at on
00:36:29.319 the channel right here again that said
00:36:31.400 you know at least these things have a
00:36:32.720 chance of coming back and so you don't
00:36:34.560 have to like Panic sell your investment
00:36:36.079 at the bottom if that happens to you you
00:36:37.640 don't want it to happen to you by the
00:36:38.920 way now what I want to talk about is
00:36:41.119 coins that are right underneath this
00:36:43.240 layer of security that I would get into
00:36:45.079 if I wanted to make a lot of money in AI
00:36:47.400 where I would start at as like a
00:36:48.839 mid-level risk portfolio is I would
00:36:51.079 start with Destra I think this is going
00:36:53.079 to be the chosen child of the run and I
00:36:55.079 want to stress other the coins I'm about
00:36:56.200 to mention right here there is a chance
00:36:57.760 they nuke I've mentioned coins on this
00:36:59.400 channel before where the projects have
00:37:01.119 failed these coins have potential to
00:37:03.920 fail everything I mentioned that that
00:37:05.440 the ones I just mentioned above they do
00:37:07.000 have a chance to fail but not on the
00:37:08.920 consisting levels of these coins these
00:37:10.640 are more riskier coins and the deeper we
00:37:12.280 get down here the more chance these
00:37:13.640 coins have to fail and absolutely wipe
00:37:15.720 out before the end of the bull run and
00:37:17.040 eliminate all your gains mid bull that's
00:37:18.880 the worst case scenario with these coins
00:37:20.760 and as we get into these lower ones this
00:37:22.319 is what you run the risk of these are
00:37:23.760 startup companies these are new or semi-
00:37:26.079 new Founders there's also sorts of
00:37:27.839 things that can happen to these coins so
00:37:29.240 for example to lay it out Powell which
00:37:31.280 is still one of my favorite coins just
00:37:32.839 to put this in perspective was one of
00:37:34.800 the chosen children in AI then they
00:37:37.160 proposed recently this proposal to merge
00:37:39.760 with another coin The Proposal got
00:37:41.800 rejected regardless of that people hated
00:37:43.920 the proposal and the thing absolutely
00:37:45.560 nuked recently now I think pal is
00:37:47.680 probably going to come back and do very
00:37:48.920 well this blun but you can see the
00:37:50.480 volatility right here pal was one of the
00:37:51.960 most sure bets in all of AI gaming
00:37:53.599 crypto went from being really good to
00:37:55.960 absolutely in a questionable range right
00:37:57.680 now now I'm not suggesting you buy pal
00:37:59.560 in this video I'm still holding all my
00:38:01.240 bags of pal through this and nothing has
00:38:03.359 changed with pal whatsoever other than
00:38:05.359 people's view of the coin okay so I want
00:38:07.839 to really state that even if something's
00:38:09.880 a sure bed in these spaces it can do
00:38:11.560 this really quickly when pal did this
00:38:13.079 the other day and Twitter people are
00:38:14.160 tagging me and stuff like that I'm like
00:38:15.480 this is this is what happens in these
00:38:16.839 coins these are the riskiest coins in
00:38:18.480 all of crypto right here and even though
00:38:20.359 pal changed nothing about their business
00:38:21.839 model nothing about the coin the
00:38:23.000 narrative in the community got mad at
00:38:24.480 them and they all Panic dumped the coin
00:38:26.000 and this is going to happen especially
00:38:28.079 in coins I talk about in my later videos
00:38:29.640 when we talk about the smaller coins so
00:38:31.040 I just want to prepare you for this now
00:38:32.599 before I talk about any higher risk
00:38:33.920 coins and also just introduce you this
00:38:35.920 if we're talking about trading altcoins
00:38:37.720 this is something you have to understand
00:38:39.319 about them so coming this if I'm going
00:38:41.240 to start building a more higher return
00:38:43.000 AI portfolio I'm going to start with
00:38:44.200 Destra I think it's going to be the
00:38:45.200 chosen childish room nothing has a
00:38:47.240 narrative and has a stronger narrative
00:38:48.839 behind it than Destra I have a
00:38:50.319 absolutely massive bag of Destra by the
00:38:52.560 way and I don't own all the coins I
00:38:53.880 mentioned on this channel but I do own
00:38:55.200 some of them and the ones I do mention
00:38:56.480 that I do own I have m of bags and I've
00:38:58.119 gone very heavy in crypto on top of that
00:39:00.200 I do consult and advise a lot of these
00:39:02.200 coins and yes they pay me for that so of
00:39:04.079 course I want these coins to go up and I
00:39:05.880 will be selling these coins in the
00:39:07.119 future as well so just being completely
00:39:08.960 transparent with you right there I don't
00:39:10.280 want to do like other channels do where
00:39:11.880 they like act like they have little tiny
00:39:13.720 bags or just suggesting something out of
00:39:15.640 the goodness of their heart and don't
00:39:17.040 have any like incentive or Tide and then
00:39:18.640 they say they're going to like hold to
00:39:19.560 the Moon with you and whatnot no I'm
00:39:21.400 here to make money just like you are so
00:39:23.040 please I just got to be transparent with
00:39:24.680 you I think dester is going to be one of
00:39:26.119 the best Runners now if we go down I
00:39:28.400 also think Echelon Prime which I don't
00:39:30.240 own is also going to be a fantastic AI
00:39:32.359 coin to deliver really high returns pal
00:39:34.280 used to be one of the most sure coins
00:39:35.880 it's in a very hazy spot right now this
00:39:37.839 is definitely a really high-risk trade
00:39:39.359 to take because it could run up right
00:39:41.200 back to where it was here very
00:39:42.200 frequently they do have great technology
00:39:43.960 and they are doing great things at pal
00:39:45.680 but they they really made a PR poooo
00:39:47.680 here recently so that's if you're
00:39:48.800 looking for a highrisk trade pal now zx0
00:39:52.599 I think is in the same level as pal
00:39:54.599 except they didn't make a PR poo poo and
00:39:56.960 I think zx0 is going to charge super
00:39:59.599 duper hard then finally where I'd stop
00:40:01.960 at is going to be node AI there's a lot
00:40:03.920 of other AI coins that I'm in I think
00:40:06.480 anyone should almost almost be on this
00:40:08.680 list I think that's a really really good
00:40:10.000 coin neural AI is one of the newer ones
00:40:12.119 I think is a really really good coin but
00:40:13.680 these are these are more newer coins
00:40:15.800 that I'll be talking about in the AI
00:40:16.880 video if I was going to stop this list
00:40:18.119 at Mid risk I'd go with node AI right
00:40:20.160 here this one's going to do super duper
00:40:22.319 well as well now there's other coins we
00:40:23.920 could talk about I think neural is a mix
00:40:25.599 of gaming and AI hash AI is another one
00:40:27.599 I think has phenomenal Nar behind it
00:40:29.200 Palm is doing super cool things and
00:40:31.720 another great one but I want to stop at
00:40:34.200 the mid- risk in this portfolio all
00:40:35.920 right so that's where I would stop as a
00:40:37.200 node AI if you want to go investigate
00:40:39.079 those other coins I mentioned by all
00:40:40.359 means now in gaming crypto if I'm
00:40:42.440 looking for explosive return mid risk
00:40:44.640 coins I'd have to actually just start at
00:40:46.280 Super again I think Super is going to do
00:40:48.000 super duper well uh there's so many
00:40:49.960 things going for it all of the tech
00:40:52.160 behind it and every way it's plugging
00:40:53.359 into games that's one of them basically
00:40:55.079 every game in crypto has to answer the
00:40:56.800 super some way right now on top of that
00:40:59.160 it has probably one of the most powerful
00:41:00.760 influencers behind it Elliot and
00:41:02.520 everybody that's really powerful in
00:41:04.040 crypto also is in this coin and so what
00:41:05.680 you have to look at in crypto 2 is the
00:41:07.160 narrative behind coins and where people
00:41:09.359 are going to move into sup at the top of
00:41:11.880 that list for me Echelon Prime is
00:41:13.400 another good one CU it ties into gaming
00:41:14.680 and AI so you have the double whammy
00:41:16.240 right there I go with cify because a
00:41:18.200 second any games start to pump really
00:41:20.560 hard the seed Investments are going to
00:41:22.280 be really really really chased after and
00:41:24.839 so everybody's going to want to start
00:41:26.000 stocking up on cifi again so I think
00:41:27.720 that's another good one miria is a
00:41:29.520 really solid infrastructure coin that I
00:41:31.280 think is going under the radar right now
00:41:32.880 that I think is going to do very well
00:41:34.079 and has a great team behind it and then
00:41:35.839 cus is just a good old classic I think
00:41:37.560 is going to do really well again because
00:41:39.079 it just has the Launchpad and they're
00:41:40.920 also founding ton which I think is going
00:41:43.280 in end the coin soon that's coming out
00:41:45.079 for ton I think that's probably going to
00:41:46.160 be one of the hottest game coins in
00:41:48.000 crypto and then two that are under the
00:41:49.960 raadar right now that I think you should
00:41:51.560 look into are Alura these are these are
00:41:53.760 a little bit more higher risk but Alura
00:41:55.440 because it provides nft technology that
00:41:56.880 plugs in in all games and there's also
00:41:58.560 another infrastructure coin called xorg
00:42:00.680 which is in my opinion I think
00:42:03.119 infrastructure coins in gaming should
00:42:05.680 all I think they're all going to pump to
00:42:07.640 super high levels up here because they
00:42:09.400 just plug into all games and the safest
00:42:11.040 way you can invest on crypto gaming is
00:42:13.160 find infrastructure coins that plug into
00:42:15.200 all the games because the way game coins
00:42:16.800 work is if a coin is a hit it pumps
00:42:18.440 super hard if it's not it Just nukes
00:42:20.079 that's really hard to predict sometimes
00:42:22.119 infrastructure games are going to get
00:42:23.880 wildly speculated on just bar none so
00:42:26.079 there are some really good game coins
00:42:27.760 that I haven't mentioned here cuz I just
00:42:28.800 don't want to mention individual gains
00:42:30.160 in this video on top of that the only
00:42:31.839 other one I would mention that's really
00:42:33.800 good is carrot and if I was going to
00:42:35.599 make any gem in this video this studio
00:42:38.599 is super undervalued at this point in my
00:42:40.680 opinion and it just became a chain very
00:42:43.640 similar to ape chain and so I think the
00:42:45.680 combination of my pet hooligan what's
00:42:47.640 coming out their combinations with AI
00:42:49.760 the things they're doing as a studio on
00:42:51.760 top of the fact that it's now powering a
00:42:53.359 chain I think it's going to do some
00:42:54.960 crazy numbers the one thing you want to
00:42:56.680 watch out four on here that gives me any
00:42:58.440 hesitancy on carrot and people you know
00:43:00.240 I love carrot but these fully diluted
00:43:02.480 market cap values right here they will
00:43:04.760 come in the play in the bare Market or
00:43:06.480 as this bun comes to an end it will
00:43:07.760 result in a lot of selling so what's
00:43:09.119 going to happen is a coin gets super
00:43:11.240 high up and then all the original
00:43:12.760 investors which I'm one of them by the
00:43:14.480 way I have a big giant bag of carrot I
00:43:16.400 love carrot they're going to start
00:43:17.559 selling when the market gets really hot
00:43:19.359 okay and so if let's say that carrot
00:43:20.880 goes like five bucks or something like
00:43:22.400 that you can bet when these people start
00:43:24.040 getting their coins unlocked they're
00:43:25.040 going to be selling and that's going to
00:43:26.000 drive the price down bigly just like it
00:43:27.880 did alivium last run but if I go and
00:43:30.319 point out alivium to you you can see
00:43:32.680 that really didn't hold it back last run
00:43:34.720 you can see it it did crazy returns and
00:43:37.400 even though it had a crazy fully diluted
00:43:39.200 value you can now see what happened as
00:43:41.040 those people took profits and it caused
00:43:42.400 just as huge as a dump after I think
00:43:44.160 alivium is going to do pretty well this
00:43:45.640 run I'm not really commenting on it too
00:43:48.079 much in this video it's not one of my
00:43:49.880 bigger holds anymore I just wanted to
00:43:51.480 show you an example and a reference for
00:43:53.079 carrot on what you can kind of expect if
00:43:55.000 carrot gets picked up whenever I talk
00:43:56.599 about coins this channel one of the main
00:43:57.880 things I'm going to look at is so you
00:43:59.319 can see super had this exact same
00:44:01.240 problem last run you can see all the
00:44:02.800 investors came in and then they super
00:44:05.079 dumped when their coins got unlocked if
00:44:07.200 you look at the fully diluted value
00:44:08.680 right now it's within 2x of it which I
00:44:10.440 think is healthy the best is where if
00:44:12.480 you look at something like Destra and
00:44:14.200 there's just absolutely the same exact
00:44:16.520 market cap as the fully diluted value
00:44:18.240 almost that's that's where you really
00:44:20.000 want to be at but a lot of the AI coins
00:44:21.720 launched on different models than gaming
00:44:23.000 coins and so for example super in this
00:44:24.640 situation was raising money so they had
00:44:26.680 to get investors in and lock up their
00:44:28.800 tokens
00:44:30.599 so that was a long video but we had to
00:44:34.000 get it out there we had to start the the
00:44:35.599 the bull market I did not want to speak
00:44:37.200 for that long but we had the kickoff alt
00:44:40.079 season somehow with a really good
00:44:41.559 thorough recap again I don't want to
00:44:43.559 even recap this video we talked about so
00:44:45.200 much those are my thoughts on altcoins I
00:44:46.960 don't have anything more to add and I
00:44:48.480 don't want to talk anymore if you want
00:44:49.839 to get updates much faster and see what
00:44:51.480 coins are going to be doing well follow
00:44:53.040 me on Twitter at zss Becker that's where
00:44:54.720 you get updates so much faster if you
00:44:56.440 like videos like like this and you want
00:44:57.520 to stay on The Cutting Edge of the Bor
00:44:59.119 subscribe because as the Bor picks up
00:45:01.079 these videos are going to become more
00:45:02.000 and more fast-paced with more updated
00:45:03.720 news because as the B keeps going we're
00:45:05.800 not going to be able to just sit in
00:45:06.720 these big coins if we want to make
00:45:08.480 really chunky gains we're going to have
00:45:09.880 to take more faster In-N-Out kind of
00:45:12.119 Trades so you're going to want to be
00:45:13.440 subscribed so you're on The Cutting Edge
00:45:14.880 of those I don't have anything else to
00:45:16.760 say and bye
00:45:30.319 he
00:45:32.240 [Music]
`;
export const commonEnglishWords = [
  "the",
  "of",
  "and",
  "a",
  "to",
  "in",
  "is",
  "you",
  "that",
  "it",
  "he",
  "was",
  "for",
  "on",
  "are",
  "as",
  "with",
  "his",
  "they",
  "I",
  "at",
  "be",
  "this",
  "have",
  "from",
  "or",
  "one",
  "had",
  "by",
  "word",
  "but",
  "not",
  "what",
  "all",
  "were",
  "we",
  "when",
  "your",
  "can",
  "said",
  "there",
  "use",
  "an",
  "each",
  "which",
  "she",
  "do",
  "how",
  "their",
  "if",
  "will",
  "up",
  "other",
  "about",
  "out",
  "many",
  "then",
  "them",
  "these",
  "so",
  "some",
  "her",
  "would",
  "make",
  "like",
  "him",
  "into",
  "time",
  "has",
  "look",
  "two",
  "more",
  "write",
  "go",
  "see",
  "number",
  "no",
  "way",
  "could",
  "people",
  "my",
  "than",
  "first",
  "water",
  "been",
  "call",
  "who",
  "oil",
  "its",
  "now",
  "find",
  "long",
  "down",
  "day",
  "did",
  "get",
  "come",
  "made",
  "may",
  "part",
];
import { configure } from "@trigger.dev/sdk/v3";
import { getTranscript } from "../trigger/get_transcript.js";
import { supabase } from "../supabaseClient.js";
configure({
  secretKey: "tr_dev_XBmrvqkfaskbVHHhftxD",
});

export async function getTranscriptContent(link) {
  const { data: analysisData, error } = await supabase
    .from("tests")
    .select("*")
    .eq("link", link)
    .eq("model", "grok");

  if (error) {
    console.log("Error at getTranscriptContent: " + JSON.stringify(error));
    return;
  }

  let analysis = analysisData[0].llm_answer;
  let transcript = analysisData[0].transcript;

  const fuseOptions = {
    threshold: 0.6,
    keys: ["text"],
  };

  let finalProjectsArray = [];

  for (let project of analysis.projects) {
    const fuse = new Fuse(transcript.split(" "), fuseOptions);
    const matches = fuse.search(project.coin_or_project.split(" ")[0]);
    console.log("\n \nChecking for: " + project.coin_or_project);
    const matchedContent = matches
      .map((match) => match.item)
      .slice(0, 40)
      .join(";");
    console.log("Matched: " + matchedContent);
    finalProjectsArray.push({
      ...project,
      transcript_content: matchedContent,
    });
  }

  return {
    ...analysis,
    projects: finalProjectsArray,
  };
}

getTranscriptContent("https://www.youtube.com/watch?v=JgjGJTrL3hY");
