import { supabase } from "../../supabaseClient.js";
import {
  correctTranscriptErrors,
  getEntitiesNer,
  makeLlmPrompt,
} from "../Llm.js";
import { LLMFactory } from "../llm/factory.js";

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

const { transcript, usage, default_content, entities, error } =
  await correctTranscriptErrors({
    transcript: `the tile's not click bait i've sold all my stocks i've sold all my crypto and i'm going to tell you why i also think 
there's a chance coming up right here to make a comical stupid 10 20 x's on a lot of coins that i'm going to show you in 
this video as well but the point of this video and why i'm not getting into jokes why i'm being very very quick right here 
is because i don't think you're gonna have a lot of time to make a decision right here i think the market is going to do this right here which is exactly 
why i've sold everything right here and you can do what you want with this info i will leave it at this though when the 
market bottomed around june 13th i pointed it out when the market peaked 
and the gaming bro run peaked and it was time to sell i pointed that out when bitcoin hit its all-time time time time 
low during coivid i pointed that out and i even absolutely nailed this last 
earnings and cpi rally am i saying i'm the world's greatest trader you should always listen to me no but i am saying 
that my same gut and information i've looked at that has told me to buy it those times and sell 
it those times it's coming off right now and so i want to show you the move i'm trying to make because what i'm trying to do right here is not be wrong and so 
what i'm doing right here is i'm selling very very specific assets and preparing to get into other assets which i think 
are going to make crazy crazy gains here and i'll be showing you those coins and assets near the end of this video but we 
have to talk about what's going on in the market first if i'm wrong if i'm right here this is just going to be an awesome opportunity to get back in the 
dca range and make really good long-term juicy buys on good companies 
and coins that we believe in if i'm wrong here we're gonna have a shot to make some crazy crazy returns let me 
show you what i'm talking about now also i don't always have time to make these videos because i'm the ceo of a company i have other stuff to do follow me on 
twitter at zss becker that's where you can get the fastest updates anything that i've seen the market anything i've 
talked about anything i'm buying the coins i'm looking at i share it there first i only make like three videos a 
month so let's dive into it alright guys so let's talk about what i am seeing 
right here and what i'm planning to do because i'm trying to win in both scenarios there's a chance that i am totally wrong here and i have a 
situation where i can win bigly make 10 20 x's very very easily if i'm wrong 
here if i'm right this is going to set us up for a whole other really awesome buy opportunity so let me break this 
down so around june 13th you can see by my video title right here this is when i deployed literally tens of millions of 
dollars into stocks and millions of dollars into crypto usually my portfolio around this time is 
like five percent crypto 95 stocks okay and you can see that the s p 500 was pretty much bottomed at this time we 
missed it by just a bit but that's fine the whole point of how i trade and how i trade everything is i don't try to 
absolutely time the bottom and i like right now i'm not absolutely trying to time the top right here i'm trying to 
get in at a good time and leave at a pretty much good time aka leave 80 of the way up with all my profits instead 
of trying to max out the top because that never ever works so i'm going to use crypto charts for the rest of this 
video instead of smp but i'm super duper focused on smp here so 
at this time what i expected to happen was essentially it just to kind of grind 
for the rest of year i thought this was somewhere near the bottom but i thought we were going to go a little bit lower maybe an 800 
low 800 each maybe 700 and i thought we're just going to diddle dattle around for the rest of year same thing with smp 
500 i spot right here and i did not expect us to do this this cataclysmic 
turn up up here i was not expecting this this is not what i was buying for it was all just about diving in at really good prices and then dca for the rest of time 
because these prices were just they were good okay we're only four percent off the top of the s p 500 at this point 
we're getting really heated up right here so at this time right here i'm just doing 
that now i was really expecting this to happen okay and this is what i think is happening right here 
if we go look at the the bitcoin charts right here we zoom back into 2017 2018 you can see we cratered 
and then we had this really big rally right here everyone was declaring bull runs back on oh my gosh it's incredible 
this stuff this is what i think is happening right here this is what i think is happening right here bar none okay i didn't expect it to be 
this severe is what we're seeing especially in stocks and the reason why i'm selling is because at this point the 
amount of money i put back in if we return back to our our last bottom it's it's a 
lot of money i'll be losing a lot of money i'm not i'm willing to do that i'm putting this back in nice safe yielding 
investments i don't want to play around i'm not looking the juice around right here 
and so what i think is about to happen is this okay i think bitcoin is going to go to probably 28 000 maybe 32 000 it 
could also top out right here at twenty five fifty i see a lot of smart people pointing that out 
my personal opinion is we're gonna grind back up to twenty eight thousand and i think everybody's gonna short at twenty eight thousand and then we're gonna pump 
to like thirty thirty two thousand and i think we're going right back down i think we're going right back down to 
i think we're going right back down to 18 17 000 and more importantly to me i don't think the s p 500 is going to sustain 
there's various reasons i will say that right now the biggest reason i think is we're just i think we're just seeing 
exactly this i think we're seeing exactly what we've seen every single time with bitcoin where it goes up and 
it pulls one of these okay this is just very typical in the dot-com crash there was 30-40 40 rallies we saw stuff like 
this all the time and on twitter what i'm seeing right now it's all the all the [ __ ] 
who are long at each forty five hundred dollars they're all this is gonna be a paid roll it's gonna go harder than you 
think all these people are popping back up and these are some of the stupidest investors i've ever seen they when 
bitcoin was all the way up here they were declaring how oh you better get in before the institutions start buying these people are [ __ ] morons like i 
could not i could not sit around without smashing my dick if i was on the same side as 
these people so that's that that's not the most mature way of looking at it that's that's not a 
trading technique at all but that's also where my thoughts are now there is a flip side to this what if 
we keep going in the bowl this is going to suck for me because you missed out all this money well one i got in the 
june lows i was buying matic at 40 cents i was getting sold 
at 27 bitcoin when it was just tipping around 18 000 sub one thousand dollar eth i'm fine 
with the profits okay i'm fine with my profits in sap 500. if i'm wrong here fine 
fine okay that that's fine but it will be a bummer if we do go back 
to a bull market so i want to show you the plan for that because there is so much money to be made here if i'm wrong 
okay before we get into that the reason why i don't think we're going any higher is is 
just this inflation is not solved we're going to keep seeing rate hikes and the effects of the rate hikes that we're 
seeing have not really hit the market yet okay income on jobs is going to need need to keep going up it's way too low 
for example my company you know we're having to give a lot of the staff like five ten percent raises that's going to 
eat into our profits a whole lot other companies are going to start seeing this do we're going to see earnings really 
start to dip in my opinion and we're also going to see a lot of people being let go 
we're also seeing going to see a problem in housing and we're going to see rates still going up and we're seeing democrats increasing taxes 
unless the money printer comes back on i don't see a situation where this is this this needs to be bullish or there needs 
to be a return to all-time highs i just don't see that okay i see it coming in a 
year or so from now or in the future because there's so many money so much money that's been printed but in my opinion i think i think it's 
just way too early for this stuff and i didn't expect to see this type of gains at this time so that's why i'm just like 
hey you know what i'm putting this in the yield driving assets they're going to be a solid passive income that are kind of resistant to the market 
and i i don't want to play i don't want to play 
now on top of that there's so many other things that could happen here by the end of the year one i think china's about to 
explode it's just an absolute mess over there and i think the underlying system of the united states right now is broken 
and i i don't think we're gonna go super far past the lows i'm not saying we're going to go to 3 300 smp or something 
like that what i'm saying is like i think this is just an overzealous point and i'm going 
to take profits right here and try and catch this next wave okay because when i bought right here before i talk 
about the next point my entire goal was just long-term wealth building okay i'm trying to buy you know 
right here right here and just enjoy the slow slow grind up that's what i'm looking for okay this is this is this is 
turned into something different it's turned into a parabolic rise up this is different i'm looking to switch modes i'm no longer in long-term investing 
mode there's a different mode i need to get into at this point that i see coming because what is coming requires a totally totally different perspective on 
the world that perspective is the only perspective in the world that matters it is so accurate so on point so 
dank and nasty although returns to this perspective it should technically be called a religion it is the religion of 
the most woke empty house crypto fat advice guy with the best body who is also family friendly and also pg get 
your [ __ ] stupid kids in the room i know it's been a while but i'm gonna teach them while their father's a failure and how they can do better in 
life by not making his mistakes look with where the markets going right 
now there's an opportunity to go behind 7-11 there's an opportunity to revisit our 
friends the dumpster coins we've left behind like dirty 2 am cardano holders 
wives and say hey this market's coming back i haven't called you because you're disgusting 
you were vile but all these top cap coins they're getting they're dn2 egocentral again michael saylor's even starting to look 
like a brilliant person again it is time to reject this and at this point grandmothers are starting to buy and as 
you know the number one sign we need to get back to our roots is when all the grandmothers start going up for layups 
in crypto when we see that that [ __ ] doesn't happen in this [ __ ] house what we do is we come down from the 
nosebleeds of the stadium and bam shakalaka dump on their asses dunk them out with our dirty 2 a.m all coins 
and guys look if the market keeps going if i'm wrong here and we're going in the bowl these grandmothers they're getting 
let's talk about now look guys before i get into this this is not the time to be doing this i'm giving you a preemptive 
warning look i know if you're a cardona holder and you've lost all your family's money and your wife's boyfriend will not even let you eat the ham out of the 
french won't even let you watch this video yet you're going to see this late you're going to lose all your money again because that's all cardano holders 
do but when you see this video don't be thinking okay it's time to ape in and make all my money back because it is not 
the point i am making here is if i am wrong if we do not see the market go under if the market 
somehow avoids the cataclysmic underlying scam that is going on the united states if we just keep going up 
or they turn the printer back on this is the playbook this is not the playbook for now put your dick back in your pants 
cardano holders don't go tell your wife you're about to make it back are you gonna need her boyfriend to keep paying 
the rent just a wee bit longer okay i know you can only make the netflix bill it's embarrassing but you gotta hold off 
a little bit longer you get a patient this isn't like at three dollars we need to get all excited all right because you're gonna get the same situation that 
happened last time don't get cocky yet you remember what happened at 2.80 when i told you to sell you remember what 
happened what happens if bitcoin goes and bust 
28 000. what happens is the s p 500 goes and busts 4300 you know what if it goes 
bus 4400 what if we just keep on going up you know what if i'm an idiot right here 
this is totally on the table they could turn the printer back on they could they could do it i mean i could be very wrong here 
see the reason why i got it again is because i'm not a long-term investment mode anymore i don't want to lose all the money i made on this huge 
run-up right here i don't want to do it that'd be that'd be painful if we go back to 16k bitcoin uh 3700 3800 s p 500 
that's gonna suck no no all right i'm not doing that 
however when the market is getting overheated like this and super hot there is opportunity to make crazy amounts of 
gains with low capital investments so let's imagine right here say right now in order for us to make a 2x on bitcoin 
we need to get to a 50 000 bitcoin i don't see that happening it could happen i don't see it happening 
if if we're at a 50 000 bitcoin you can come back and tag me and say ah it's a 50 000 i'll be like i didn't see it coming you were right you win all right 
but let's say we're waiting out for that we want to get a 2x in bitcoin let's say we have a million dollars uh in profit now in bitcoin from buying or let's use 
a little bit more realistic example because no one ever makes any money in bitcoin let's say we bought eth at 
i don't know uh 900 all right so now we we put in 500 000 guys i realize not 
everybody has 500 000 i'm just using big numbers that are easy for me to do math with imagine we're at 
a 2x right now okay so for us to get a 2x on this right now we need to see a four thousand dollar 
eth okay can we see that yeah we we could but what i rather do is take out that million dollars i have now 
and go down here and so what i would rather do is go down to mid caps and low cap coins and because 
if eath goes to four thousand dollars we are going to see these coins down here and the coins i talk about here in a 
second but this could be literally any coin that's a micro or lower cap we're going to see those 5 and 10x and so 
we can put in a lot less capital in the crypto markets which are in a very dangerous spot right now in my opinion 
and see the same returns that if it went to let's say thousand five thousand 
dollars wanna see better returns if each goes to ten thousand dollars these mid caps and micro caps are going to 2050 x 
okay and then the reason why i say trade like this is because look 
if if each goes to ten thousand dollars all these coins are going to 520x 
easy easy okay so you might as well just be in these coins and the second the crypto market gets wiped out and ethereum gets 
wiped out as well well these coins are gonna get wiped out as well so if you're gonna be in the crypto market during a pump or a bull market you might as well 
be in mid caps let me give you the point i'm talking about right here if we go and look at let's say a good old 
juicy cap right here let's look at one that started to move when if we go look at other coins in this time frame 
that really start to move let's go look at like avalanche or something all right we go look at this and 
it just came out so this is a terrible example right here but i mean avalanche was just like at dirt levels right here 
you made an insane return if you got right here if we go look at sandbox or 
uh hell let's just look at something boring like v chain right here if we go look at that 
20 20 i mean yeah these this is where you want to be and that's where we're going to be at if bitcoin goes to forty 
thousand fifty thousand dollars we can get into coins like this 
with lower amounts of money that if the market reverses okay [ __ ] at least we didn't lose all the money we've made 
into this point right now but the market continues going bull holy moly we're looking at 10 20 30 x's 
and we're doing the whole same crap we made our money in a year ago okay so let's talk about specific projects and 
themes not specific projects but themes of what we're looking at so first off the game plan 
i'm waiting till bitcoin bust 30 maybe even 33 000 before i start doing 
this is it gonna do that is that a way off yeah are we missing some gains in ethereum and bitcoin right now yes but 
we got into lows my gains i'm happy with i'm fine 
i did not expect to make this much money this fast it's cool it's it's fine you know i will 
sit this one out because it is is going to be much more unbearable for me to lose all the gains i've made 
versus miss out on some of these ups right here and i really don't see the market moving until we get to a 33k bitcoin what i 
think is going to happen like i said is we get the 28k everybody shorts okay or everybody's gonna it's gonna be this 
situation right now at 25 50. we get the 28k everyone shorts it pushes it up to 31 and then 
that that's that's pretty much it that's the top okay like i said i try to get out 80 before 
the top or twenty percent before the top eighty percent of the way up is fine with me that's fine worked it's worked 
well for me every time i don't do that i get my butt handed to me where am i gonna be looking to play at 
so what i want to look at is old all-time highs and so for example matic right here its 
all-time high is at 2 and 50 cents so we can see like a clean 2x pretty 
quickly on polygon but i don't want to deal with coins this big what i'm going to do is i'm going to start getting down into the lower coins okay so let's talk 
about some big old juicy somewhat safe coins okay 
and i want to show you my logic here i don't want you to copy these coins so if you saw my buddy elliot trades video you 
might have heard of him he picked some really good decent mid-cap coins that i agree with curve he picked apecoin and i 
would have to throw in kusama in there i think i think dot is going to make a run here 
stuff ender dot is going to make a run i think it has a ton of adoption potential right there i'd pick something like 
encore right here just just really good middle cap coins that really haven't started the move yet pancake swap thor 
chain phantom i think i already mentioned that one i'd roll a v chain and then maybe some file coin these are 
all ones that i like i could see all these really easily 5xing like just just no problem easy 5x's i don't like 
apecoin at all i'm it's not really the whole entire system isn't really for me but i think 
eight point could easily go up to 20 bucks no problem especially in a bullring especially everyone's going to foam into these things so fast and the 
market caps are relatively low for crypto right now these things can get to 10 
billion no problem dude that's not even an issue and that's what that's why i would just roll into i would just make a portfolio 
of those things what i would not do if the market starts running is make a portfolio of the top 10 because 
in my opinion this is this is not going to be a bull run i would love to be wrong here because 
trading micro caps and [ __ ] coins is is what i thrive at and that only really works in a major bull run it doesn't 
work it hasn't worked for like a year almost at this point it doesn't work so i'd love to be wrong here i don't think i am 
but in a bull run you know we could see solana we're gonna have to see the bull run 
here to see like major returns on the top 10 coins i don't think that's going to happen again we'll see bigger returns 
in the mid caps but i would not build a portfolio of ethereum [Music] solana 
polygon at this point right now because i don't think this is the ball run and when we go backwards guys we're going 
backwards like we're we're going back to the [ __ ] future here we're gonna go back and date your mother 
that's how far back we're gonna go maybe not that far but i just see a very nasty return okay i don't see any reason for 
us to be going back to all-time highs when there were zero rates endless money printing and basically every advantage 
you could have with a fake fomo market you could possibly ask for we're not in that market at this point i don't see any reason returned to that market at 
this point there's also so much nasty stuff coming now what i'm going to be doing is i'm going to be moving into 
coins that i really liked before that are just in the absolute dumpster first tip i have for you look at the 
ecosystems where the narrative is if you want to get in the polygon matic look for the stuff that's being built on 
polygon look for the stuff that i just say polygon look for the stuff on solana and polygon this is where the narrative 
is okay the polygon and solana people are not going anywhere also bnb 
this is where the narrative is as well look at the stuff and the ecosystems underneath them 
look at the dexes and swap sites look at the nft specifically the nft 
platforms look at the wallets that's what you want to be looking for look at the lower tier projects being built on 
these systems the things that are in the ecosystem look at the launch pads those are going to give you phenomenal 
returns much better than just putting in solana because again let's say you know you invest in radium okay 
one of the key parts of the solana ecosystem if saloni does a 3x radium is going to do a 5x or a 6x that's that's 
what you want to do that's what you want to do yeah so i'd also be looking at polka dot as well it could make a run stuff like 
polkadex polkastarter the same [ __ ] different day as last bull run okay so 
go look at the old all-time highs where i think the best returns are going to be are gaming coins because the entire 
narrative is there and apecoin is going to be the bitcoin of this market it's going 
to take off and what everyone's going to do is go well acorn took off so this must be time for the metaverse we'll do this whole 
we're going to do this whole song and dance all over again no one's going to learn anything if we go back to bull run we do the same crap over again 
and we also will take advantage of it people want to be ass clowns let's just let's roll with it all right let's go i've 
already stated my case for gaming crypto i'm not doing again the home page of the channel is why i think gaming crypto and 
metaverse is going to take over the world now look i truly believe that but if we go back into a mini bull run right here i'm not here to do some altruistic 
virtue signaling investing i am here to catch all the people acting like fools again that's what i'm looking to do i'm 
looking to make money here i'm not looking to invest in the future i'm not looking to send little kids to 
college i'm i'm here say look if you guys want to fomo back into this crap all over again 
before it before it's time i will be here waiting at the top again that's fine we can do it so with that being 
said the reason why he's going to get the biggest returns is because they've gotten the biggest losses and the narrative is still there we saw a 
facebook and all these companies just rolling face type into this stuff so 
what i'd be looking for is again i'm going to look for the studios i'm going to look for the launch pads 
i'm going to look for the platforms i'm going to look at the over hyped games okay first and foremost if you want 
these coins and and and get into these things early and you want to spot these things when like they're happening you 
want the fast information in this industry right here you should really join neo tokyo specifically getting an s1 there's a 
link to these in my profile on twitter at css becker why should you join this it's because it's a community completely 
dedicated to the vcs investing and builders and gaming crypto we share all the information we're seeing all the 
projects and what happens in this community is via our token bytes which is shared between everybody i'm not 
saying fomo on the bytes pay attention this allows us to run launch pads for 
projects and seed investing allows us to have white lists for upcoming nft projects in the space it allows us to share alpha and pay for alpha between 
each other to basically find the projects the best projects as they're coming up and get the alpha and research 
in before any of this stuff happens this is not some get rich quick community this is not some ponzi scheme where i 
have a giant bag i'm waiting to unload on you this is just a community full of people that love crypto gaming in the future of metaverse and that's all we 
talk about that's where i have all these projects launching out of neo tokyo and that's why we have so much infrastructure built more than any other 
nft project in the space around investing and finding and participating in gaming crypto so if you're really in 
the gaming crypto you really believe in it come join neotoku if you're some spaz get rich quick floor flipping idiot i we 
really don't want you there all right but this is invite the people that have the same mindset as we do if you do not please stay away and just stick to my 
videos that said bytes 2.0 drops here real soon and s ones are the only ones that generate a lot of bytes basically 
the main generators of bytes and so there's only like 13 of them before they hit attendee floor so if you've been looking to join or you're like thinking 
about it price escalates quickly pretty much here soon these are other people i don't own these just letting you know 
before it happens because when this stuff takes off we are there at the forefront the cutting edge of it every single time just like we were last run 
when it happens again we're gonna do that now if it does happen again here's what i'm gonna be looking at from a 30 000 foot view okay i talked about 
the platforms on stuff i would invest in a coin if 
if i really believed in apecoin and this bullring keeps going i'm i'm not that in the apecoin it's more of like a bitcoin 
of gaming crypto at this point i think it could go to 20 bucks no 
problem maybe higher it's it's really not for me i want to see higher returns than that okay so i 
think there's much higher returns and stuff like gala games the studio where all the best games and all the best stuff is coming out of in gaming crypto 
i think that's an easy one right there look look look apecoin's at like two billion bucks right here gala is at like 
four bill 400 and if apecoin goes to 10 right here it goes if it goes to it does 
a 5x at this point right here this is going to go way higher all right we could easily get the 5 billion see a clean 10x on this this dude right here 
so gals about where i would start investing at now please understand if i don't mention 
a gaming project in this video i'm not going to list the 50 plus gaming projects i think are really great i'm not going to do that 
there's other videos where i have i we talk about all the time in neo tokyo i'm just not going to do i'm just going to give you a summary of how i'm looking at 
this market okay again vulcan forge is another good one and i think if gala takes off vulcan is 
very similar to gala in my opinion and so it's just a smaller version of it i think this vulcan could easily get to a billion dollar market cap no problem it 
could go back to its old all-time high right here at like 45 bucks no no problem no problem that's easy if we 
if we return back to a bull market easy ad shares i think is really really cool i think advertising the metaverse and 
advertising and gaming and advertising crypto is going to be huge the market cap of this is disgustingly low for the 
potential this could be a multi-billion dollar one if they pull off what they're talking about right here keyword if 
i i would i would be looking at ad shares cdfi now look neo tokyo also has its own launch pad but you have to be a 
member of neo tokyo to join all right and that's me and elliot are just bringing the best projects to get into early there if you want to get in the 
projects day one you want to get those seed investments in that you should be in neo-tokyo all right but another favorite of mine uh is also cdfi 
why because everybody's going to rush back in the gaming audios and cdfi gets a ton of really good ideas as well 
that's an easy one you can enter if you don't have the money to hop into neo tokyo i think it's going to do great i think it'd go back to its old market cap 
super duper high because basically c defy is the face of launch pads and gaming uh and that's 
gonna do really great if we return the bull run again guys we are not in a bull run right now we are in a likely a bear 
rally so just getting prepared again if i am wrong about the market coming back down 
this is where we want to be roll into we want to have this list available right in front of us as soon as it happens so 
we can beat everybody else to it also just have to shout out super farm i'm going to be very light on super farm because just being fully transparent i'm 
a massive massive investor in super farm elliot is one of my best friends in crypto i 
totally biased here if there's a word for bias that being said i see everything that elliot is building behind the scenes imposter's launching 
soon i see the platform that's coming out there i see massive team ds running over there i'm 
going to let super farms results speak for themselves that being said i am i am very much in super farm i like 
super farm i will leave it at that veracity i think vericy just the hype 
behind this alone people love this thing it has like a cult following it's supposed to replace streaming and 
video game streaming and all the stuff right there i don't know if it's going to do that i think the height behind it is ridiculous i think we'll do very very 
well alluvium now another really good project is alluvium full transparency i'm an early investor 
in alluvium and so i i sell a lot of alluvium so if if after this video if someone's like 
better selling alluvium yeah i do right now and i'm taking profits in my very very very early 
investments in alluvium so i'm putting fully transparent with you right there that being said i'm going to stop selling alluvium if we go back into a 
bull market because i think it could go back up to 500 at least you could see the top of this right here is eighteen 
hundred dollars i think illumi could do it because it's one of the most impressive games being built in crypto gaming right now in my opinion okay 
depends if we go back into a bull run it'll be good but again also when you're looking at these projects there's another prime example right here you 
need to look at these fully diluted market caps this is an absolute plague in crypto gaming right this is everybody 
whose coins are waiting to be released and be sold you can see it's 10 times actual market cap of coins on the market 
right now that's not good you want to look for that in projects wilder world is going to have a lot of hype behind it 
and here's what here's where it starts to get really juicy guys as we go down here we're entering 
market caps under 10 million dollars and we have a lot of good projects going on here and i'm i you can find you can find 
out what my favorites are in these projects right here by going through my old videos again if you're in 
neo tokyo you know what these are but i don't want to mention these in the video right now because at 
look at some of these market caps right here we're breaking the million dollar market caps two hundred thousand three 
hundred thousand dollar mark three million dollar market cap so mention these things can send these things parabolic 
so i'm not going to do that at this point i'm about comfortable mentioning everything we've gone down through at 
this point so what you need to do is you need to go and get a big list of 
all the coins that and maybe i'll make a video on these in the future i'm not going to do it right now okay i'm not 
too many people are going to follow in and they don't understand what micro cap trading is they bought it in the crash well that's 
what it does you [ __ ] that's what micro caps do this is not we're not trying to find a wife to marry for the rest of 
their life we're trying to find something that pumps and then ride the market and get out of it all right not a bit of people get that and so i'm not 
they're gonna do that in a bear market so so i'm not even gonna give them the chance to try and do that in a bear mark what you need to do is you need to go 
through all these coins you need to find the good ones maybe find some partners in gaming crypto and find the good coins 
and and work through them with people get a good list of them going find stuff that's below a 10 million dollar market 
cap and the second bitcoin really busts that convincing 33 000 in my point 
let's go let's go up to the races so guys that's what i think about the market right now [Music] 
long video a lot to talk about i don't have anything else to say follow me on twitter at css becker because 
that's where you're going to get the information way way way sooner for me join neo tokyo if you want to be on the 
inside edge of everything going on in gaming crypto investing projects early interact with people they're doing the heaviest alpha research and finding 
these gems when they're down that's where you want to be other than that i think i've talked long enough i'll see you next time 
[Music] 
you 
 - Generated with https://kome.ai`,
  });
console.log(
  ` Transcript: ${transcript} \n Usage: ${usage} \n Entities: ${JSON.stringify(
    entities
  )} `
);

/* console.log(
  await getEntitiesNer({
    transcript: "I want to invest in Bitcoin and Ethereum",
  })
);
 */
