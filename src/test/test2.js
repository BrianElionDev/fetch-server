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
    transcript: `Look, we're all where you're 
stupid so I'm pretty sure you're 
not seeing what the Trump family 
is doing on chain with 
Ethereum and Bitcoin right now. 
Specifically the wallets connected 
to Blackrock, specifically 
their biggest accounts. 
What we're seeing on Ethereum 
and coins underneath it right now. 
Don't even get me started on Solana 
and Cardano is fucking nuts. 
The game potential is and I was 
planning to make some big video 
but I have to get this video out 
today because this info is going 
to be irrelevant in like 24 hours. 
And people that see this and take 
advantage of this now are setting 
themselves up for a perfect entry, 
a tier 10 penetration, a nice wet 
and cozy 10x20x entry on the next 
bull run. 
And everybody that doesn't get 
this right now is going to have 
to take massive risk and setting 
themselves up for massive losses 
in the future because I'm seeing 
an entry like 2023 and if you 
don't remember the results from 
that, we made a ton of money and 
every turbo investor, every big 
insider investor is making these 
moves right now. 
And these new tariff updates 
have just added gasoline. 
And so you should know 
and understand this too and what you 
should be doing in the sweatiest 
fastest way possible. 
And this is meant to help you do it. 
I want to get into this right now. 
Let's just dive into it, 
let's get into the charts. 
So we need to talk about this move 
that just happened and how it's 
going to send everything on Ethereum 
and underneath Ethereum nuts 
and give us a crazy ass entry. 
First things first though, be sure 
to subscribe and like this 
video because a what I give in these 
videos and the projects I 
mentioned, it's time sensitive. 
The people that get here first have 
an advantage and I make sure these 
videos go out to my subscribers 
first and people that like 
the videos see the videos first. 
On top of that we have our 
meme coin dropping here 
likely in about a month. 
I can see everybody that subscribed 
to this channel and when it comes 
to the whitelist allocation on 
that, the people that are going to 
get access to the coin aka it's 
100% free, it's just first come 
first serve. 
It's going to be preferential 
treatment to people 
that are subscribed. 
So for the love of God, subscribe. 
So you see these videos first 
because I'm going to be talking 
about a lot of projects on here and 
things I think are going to do very 
well that a lot of people don't 
know about. 
And if you want dibs on those, 
you got to be here first. 
So let's discuss. 
So first thing we got 
to do is talk about the current 
move in the market. 
And then what I'm talking about, what 
I've been referencing in this video, 
the amount of gains that we can 
punch you to potentially get into 
right here is going to be obvious to 
you. 
This is actually just a video 
begging you to help yourself. 
Because the situation we have 
right now in the market is like, 
have you ever seen a girl that's 
like a 12 out of 10, but when she 
was in high school, middle 
school, she was a fatty, she was 
a chunk, just a real roly poly 
kind of chick. 
But the really smart guys, the 
really clever ones who could see 
the dip, the depth of her soul, the 
fundamental cheekbones that she had 
go, man, if that girl lost some 
weight, if she stopped being so 
damn fat, she stopped cramming 
those Oreos and Twinkies in her 
mouth at record amounts, she would 
be hot as man, the smart people at 
those times, they'd start buying 
her lunch, maybe giving her some 
Atkins bars, handing her pamphlets 
on the Carnivore diet because they 
know the potential there. 
And in a couple years later, when 
she's an absolute babe, she 
remembers, hey, that's the guy that 
liked me even though I was a fat. 
That's the guy that even sat next 
to me in gym class even though 
I smelled like a fresh pest 
pig straight out of yoga class. 
And that is how a five foot one 
man like you gets laid here. 
This is the same exact situation. 
The market looks terrible. 
It's a real chunks, really 
belly hanging over the waistline 
kind of gal right now. 
But if you see the underlying 
bone structure, it is hot as 
and you need to get in it now. 
You need to start investing in it. 
Here is why. 
So what we're seeing in the markets 
right now is you're seeing 
all this tariff stuff and stuff 
flying all over the place. 
You're seeing Donald Trump post 
an insider trading saying buy now 
again as the markets right before 
he turns the tariffs on and off. 
I'm sure you're aware 
of this situation that's been 
going on the last month. 
We saw bitcoin go and take 
a massive dump when the tariffs 
were all coming online. 
And basically this entire year 
we've been seeing these fears of 
tariffs happening and it driving 
the market down, down, down, down, 
down to this big capitulation 
right here, which then Donald 
Trump went and then tweeted, okay, 
good time to buy. 
And Then he released 
the tariffs in the market. 
Slung shot up. 
A lot of people, a lot of people 
that are really smart, smarter 
than me on Twitter, have all 
flipped bullish at this point. 
And I don't really think that matters 
because people on Twitter, people 
that are posting their trades, most 
of these people are retarded. 
You're better off getting 
advice from a penguin on Adderall 
you stole from a local zoo. 
I don't know how you create that 
situation, but that's how stupid 
people are when it comes 
to listening to trading advice. 
And we don't swing trade 
on this channel. 
We just hold. 
And the reason we're holding is 
because of the huge potential that 
we're about to see that is coming. 
But if you need any confirmation 
box, I'm seeing everybody 
flipping bullish right here. 
And the real story is not what is 
going on with Bitcoin right here. 
It is what is going on with Ethereum. 
And if you understand this right 
here, this is where we're going 
to be getting these giant gains at. 
This is where the potential is that 
it's not particularly in Ethereum. 
But let me explain real quick. 
So we are seeing max 
fear in the market. 
We are seeing this crazy amount 
of paranoia that 
actually makes no sense. 
We have seen crashes in the stock 
market, crashes in crypto that are 
the equivalent to the COVID crash, 
the equivalent to the 2008 crash. 
Why? 
If you look at the 2008 
crash, we had banks folding. 
It was a serious problem. 
If you look at the COVID 
crash, holy shit. 
Like, literally, the government 
was like, hey, you're not 
allowed to leave your house. 
The White House is posting 
on their site. 
Hey, you're probably gonna die. 
Like, they literally post 
on their website. 
You're in for a winter of death. 
Inflation was running up to 80%. 
The cost of renting a studio 
apartment went from like 
$500 a month to just AIDS. 
That was the price. 
It was just AIDS. 
You have the. 
That's how expensive it got. 
Things were terrible. 
People are being laid off 
from their jobs like crazy. 
Whole entire business 
is being shut down. 
Things were terrible. 
And we crashed more 
or around the same levels of that. 
This is stupid. 
If you don't. 
If you don't catch my 
drift, this is dumb. 
This is the dumbest drop ever. 
And it's completely triggered 
by a controllable toggle 
via Donald Trump right here. 
So what you need to understand is 
that all the things we've been 
seeing with these markets right 
here, they're easily reversible in 
combination with the Fact that 
there's more money sidelined in 
crypto and in general markets than 
ever before. 
So we are looking at this 
overdramatic crash that has no real 
merit behind it, that is completely 
controllable by who's in power. 
And this person that's in power 
is incentivized right now. 
They're getting the inflation 
low, they're changing the rates. 
That's what Trump is doing 
right now on the US debt. 
And if you think he's not going 
to pump the absolute out 
of this going in the midterms, 
I think you're crazy. 
This guy, look, we have a guy who 
literally will give you stock tips 
from his presidential account. 
We have a guy that we're 
a little pump and dump 
a meme coin as president. 
Regardless of your feelings 
on this, this motherfucker 
likes to play the markets. 
He likes to move them up and down. 
And his little inbred insider 
trading children, they love it too. 
This is not, this is not an ethical. 
Let's let the markets do 
what they're gonna do. 
Presidential administration, okay? 
Let's just get that straight. 
So all in all, I think 
we're about to rebound. 
And here's the crazy thing that 
I'm gonna tell you in this video. 
I don't even think we saw the bull 
yet because what we saw last year 
really appears like what we saw 
prior to the 2020 run. 
Now, I don't know if it's going 
to be this dramatic, but we 
saw like a pretty solid run. 
We saw ethereum run from 
$100 all the way up to $400. 
Like we saw a good 4x on Ethereum. 
We saw Bitcoin do a similar 
3, 4, 5x right there. 
We just saw that right here 
in the same exact time frame. 
We're seeing something 
very similar happening. 
So here's where the culmination 
of all this comes together. 
Here's. 
Here's the point of this video 
where I show you the light. 
Here's the point in this video 
where we whip out the cannons. 
Alright? 
This is what you came for. 
I know you guys also 
come for the pack. 
Had to give that to you in the video. 
I know we didn't get on the intro 
and by doing that I'm at risk 
of losing my title of the gayest 
channel in all of crypto. 
I'm like SpongeBob SquarePants. 
I live in a gay bar under the sea 
and I know all the men who 
watch this channel and the two 
girls, you come for the pack. 
So I gotta keep that content Sky High 
for my straight male followers who 
are very masculine because frankly, 
I can't let my view counts go down. 
We're in a bear market. 
I gotta pay the bills somehow. 
So don't you worry. 
The low quality gay content 
is gonna keep coming 
your way on this channel. 
And for the two girls who watch 
this channel, I'm married. 
This is not for you. 
Get your thirstiness somewhere else. 
Though if we do hit a $900 Ethereum, 
the Alex Becker Onlyfans that 
is coming out, it will be great. 
You guys think my six pack is great? 
You should see my dick. 
Okay, all right. 
But seriously, I mean, you 
guys think my six pack is great, 
you should wait till you 
see my Magnum Giant dog. 
It's, it's very impressive. 
But that's only if we get the $900 
Ethereum, which I don't think is 
going to happen because of this. 
Look, gentlemen, and you two 
thirsty, thirsty women watching 
this channel here is where 
we're going to get turbo rich. 
Okay, so look, Ethereum is 
committing mass sepuku and everyone 
hates Ethereum right now. 
And there's two places 
where we're going to make a lot 
of money right now. 
One is just in Ethereum, 
but one is in everything that 
Ethereum triggers, which I'm 
about to tell you about. 
And that's where the real 
money is going to be made. 
So let me lay out this 
the scheme for you. 
Okay, so look, if you go and look at 
the overselling on chain, we look 
at the selling metrics of Ethereum 
compared to its past history and 
everything like that, it is more 
oversold than it's ever been 
oversold before ever in the history 
of Ethereum. 
Like this is the most oversold, 
ridiculous overselling 
of it that we've ever seen. 
If Ethereum has any future of ever 
returning to its all time high, 
which I think is almost guaranteed, 
this is one of the best buy points 
you're ever going to get by that 
metric. 
Now combine that with 
the fear and greed index 
that we're looking at. 
The fear and greed index, 
particularly on Ethereum. 
But just crypto as a whole is 
at nuclear lows. 
It was like at, if you touch 
crypto, your father gets gonorrhea. 
Like levels of fear. 
Just really scary stuff you 
don't want to put your hands on. 
You don't want that to happen. 
You don't want your poor 
old dad suffering from that 
in his older age. 
He's gotten clean his whole 
entire life to this point 
and you curse him with that. 
What are you doing? 
That's how bad it's been. 
And this is again ridiculous. 
When we look at the context 
of the overall market 
and where everything is. 
This is silly, gentlemen. 
The tariffs and everything in 
the crash and everything we've seen 
with all the money that's 
absolutely sidelined, it's stupid. 
Then we have to look 
at the underlying scheme of it all. 
BlackRock and the Trumps are just 
the most dubious, silly mother 
shenanigans on planet earth. 
And what are they doing 
during this entire time? 
They are buying tons of eth. 
Now of course I think Eric Trump 
at World Liberty Finance, 
whatever bottom sold eth 
but you have to factor in that 
Eric Trump is an inbred retard 
so you can't factor that in. 
That does not match the bias 
I'm presenting in this video. 
Therefore it is irrelevant. 
We don't factor in FUD or things 
that slightly contrast anything 
that I point out on this 
channel 100% up only matches my bias 
exactly content so that part 
of evidence, subtract it. 
But if you look at the Trump's 
wallets, you look at blackrock's 
wallets, you look at all the. 
I'll get into the banks 
and everything here in a second. 
They are buying tons of Ethereum. 
Why are they doing this? 
Like why would they be buying 
an asset that they think is 
going to crash even lower? 
Why would they be buying 
an oversold asset if they think 
it's going to die here? 
It's because it's not. 
And these people are the ones 
who control the finance 
across the entire world. 
All the banking institutions, all 
the money, they control all of it. 
We're ruled by these institutions, 
not actually our governments. 
So all evidence points to this 
ETH being wildly oversold, 
the fear being wildly 
overstated, all the biggest money 
in the world buying. 
And then finally we are seeing 
banks and all the cores of finance 
starting to build on Ethereum. 
Which means that in the future 
all of our transactions, all of 
our NFTs that represent our 
assets, our homes, it's going 
to be on ETH for a bunch of 
reasons because I'm not going 
to pitch all the benefits of 
ETH right here. 
And frankly I think ETH is kind 
of dog but I think all these 
things work themselves out 
in the future when it comes 
to the layer twos and whatnot. 
And frankly, I don't care 
about the future. 
That's not my prerogative right now. 
I care about the short term story 
that people are telling themselves 
that is going to play out here in 
the next one to two Years after 
that, I'm going to turbo dump on 
everybody. 
I don't give a happens to eth it 
can go underwater and drag half 
of our financial system to hell. 
I don't care. 
I'll be in the Bahamas 
somewhere doing drugs. 
I don't care. 
So please keep that in mind. 
If your debate is like, well, long 
term Ethereum is not going 
to work, I kind of agree with you. 
I just don't care. 
We're doing this to get rich quickly. 
Gentlemen, we're not doing this 
to invest in the future. 
It's crypto. 
Keep telling people about the tech. 
Keep making them believe 
it's imperative for our little Ponzi 
scheme we're building here. 
But we all know the real secret 
about what's going on. 
So you combine this all together, 
guys, we're in this one 
little situation right here. 
We're in a very unfair 
roulette table like situation. 
So all indicators that we're 
looking at in the markets, even 
in stocks, even in crypto, 
point to a very unfair 
like roulette table situation. 
I want you to picture you go 
to the table in Vegas 
and you're betting on red or black, 
but red has a 60% chance. 
But if you went on red right here, 
you at least 3, 4x your money. 
And if you look at the coins 
and projects I'm pointing out here, 
in a second you 15, 20x your money. 
Let me back up. 
If you're dirt poor and you have 
like no money and you're having 
to dip into your savings 
account and your food money 
and stuff, don't get into the. 
Why are you watching this channel? 
Go to work. 
Get your life in order. 
All right? 
Now do not invest in anything 
I talk about in this video. 
Actually, just full disclaimer. 
This is, this is suicide. 
I'm sitting on this channel talking 
about your dad getting gonorrhea. 
If you lose money based 
on stuff on this channel, it's 
really your own fault. 
Let's be real here, all right, 
I'm gambling like a Jenner. 
But, but backing up, backing up. 
We're sitting at a really unfair 
bet right now because if we 
nailed this right, we're looking 
at a minimum 3-4x on Ethereum back 
to its old all time high. 
Like it's literally a 3x back 
to its old all time high. 
If it breaks it just 
a bit more, it's 4x. 
Now the coins underneath it, 
the altcoins underneath it, they're 
going to 5, 10, 15x if we run. 
And so I'm not saying hey, the bull's 
going to happen this year. 
I'd say there's a 60, 70% chance 
though, that we bull, okay? 
And if we do, the rewards 
are lopsided. 
If we, if we bear from here, 
this is, this is the bet, okay? 
This is not me telling you 
where the market's going to go. 
If we bear from here, Ethereum 
could go down, let's say to $700 
or something like that. 
That's like a terrible end 
of the world situation. 
And if that happens, you should 
keep buying more, frankly. 
But if that happens, yeah, we're 
going to lose 50% of our money. 
But if the bull happens right here, 
from these insane points right 
here, this insane fear, these 
insane points of overselling, like 
record levels of oversell that line 
up perfectly with the flows of the 
last bull run, while all the 
biggest institutions and the trumps 
and everybody that has a lot of 
money and insider information is 
buying the shit out of it. 
If we see a bull from these points 
with the most record amounts of 
money sidelined in crypto and in 
other assets ever, tons of people 
who have been watching CNN stocking 
up on gold and all these other 
assets because they think the 
world's about to end when there's 
literally nothing indicating that if 
we get a bull from these points, 
which by all these points right 
here, if you line these up in the 
past, if you look at any time or the 
financial climate lined up with all 
the things I just talked about, you 
are buying at the best time ever. 
So the odds, my young 
padawan, are in our favor. 
And so if we get a bull 
from here, the returns are 
going to be outrageous. 
And it's put us in a very 
unique situation right here. 
Let me explain the two situations 
I'm looking at right here. 
So there's two type 
of investment situations we're 
looking at right here. 
One where we're looking to 
safely invest in crypto. 
And by safely invest in crypto, I 
mean we're going to invest in coins 
that are, that are going to likely 
be around in five years from now. 
If they crash from this 
point, we're probably only going 
to see a 50% crash. 
Okay? 
That's the first type of investment 
we're going to look at right here. 
And in these type of investments, 
we can kind of look at 3 
to 4 x's to 7 x's on these coins. 
That's great. 
The way we want to trade in this is 
with large sums of money. 
For example, if I had like. 
I'm not suggesting you do this 
at all this is just me. 
This is just me. 
So I'm very comfortable putting in 
like 10, 20% of my net worth in this 
right here in order to 2, 3, 4x it. 
I'm very comfortable doing that. 
And if I lose, let's say I put 15% 
of my net worth 
in here, which is pretty large. 
I'm not gonna lie. 
My dick, my magnum dong, I do 
all right in actual business. 
This is just my side hobby because 
I'm a degenerate piece of. 
But if I put that in there 
And I lose 50% of that, that's 
fine, I can replace that. 
That's not gonna set me 
back in life forever. 
But if it hits, I'm doing, I've 
increased my net worth 50, 60, 70%. 
That's how I'm trading 
with these type of coins. 
I'm going to talk about initially 
first but then the second hand 
part of here is the coins 
underneath the smaller altcoins, 
they are going to 10, 15, 20x from 
these points because people, if 
you think they've oversold eth, 
these are oversold at the points 
of it's depravity because all the 
things I mentioned before, those 
are going to 10, 15x. 
And so if I put in, let's say 2% of 
my net worth, I can go and increase 
my net worth 50, 40, 60, 
in some cases 100% from these small, 
relatively ballsy bets. 
And so those are the two 
situations we're going 
to talk about right here. 
So the places we want to be 
looking at right now, one, 
just straight up Ethereum. 
If I was the most boring motherf er 
on planet Earth, I think the odds 
of Ethereum going back 
to an all time high are like 90%. 
Now in three years from now, 
if this doesn't happen, please 
come quote this video. 
Slap me across the face 
with the dick of shame. 
I get it, I get it. 
A lot of people are saying ETH is 
never going to do this again. 
And that's, that's the reason 
why I'm so bullish. 
Eventually if we want to make 
a lot of money doing this, 
we're going to have to take some 
contrarian bet right here. 
And I think the easiest 
contrarian bet on planet Earth 
is that ETH is oversold 
and everyone's being stupid. 
If you look at every underlying 
thing, it looks bullish as. 
So if I'm just being 
boring, I'm going to chuck 
a bunch of money on ETH. 
Worst case scenario right here, 
ETH goes down to 700, $500 and I'm 
wrong and I'm just like, 
damn it, that's, that's obnoxious. 
Both can happen. 
Losing 50%, making a 3.4x, 
that looks very likely. 
That's a great bet that 
I'm going to take. 
I'm playing the odds. 
I'm not predicting the future. 
Please always understand these videos 
now. 
If ETH goes back to all time 
high, there is one thing 
we can expect right here. 
It's that the coins underneath 
it are going to go nuts. 
So obviously, if we're again 
being big boring investors right 
here, let's not get creative. 
This is, this is great beginner 
investing right here. 
My suggestion to you, as always, 
is don't touch this at all. 
Stay very far away. 
Stay very far away. 
When people ever meet me 
in real life, they're like, oh, 
hey Alex, how's it going? 
I watch your channel. 
I'm like, I'm so sorry, my apologies. 
That person in the videos, 
that is not me. 
Why are you doing this? 
Why are you being so irresponsible? 
And they're like, no, 
no, I love crypto. 
It's great. 
Do you have any coins 
I should get into? 
And I always tell them, get 
the F out of here, Stop. 
Take everything, sell it now. 
That's literally what I tell 
people in real life because 
this is super dangerous. 
But if you must play, if you 
must put your dick in the 
pencil sharpener, the best 
place to start as a beginner, 
which is 95% of you, you should 
just stop here at these 
suggestions right here. 
We can go look at coins like 
Solana, Doge, Cardano, Avax. 
I love chainlink, but I 
don't think it's ever going 
to produce gains ever. 
So I'm going to hold chainlink. 
But that's kind of like that fat 
girl in high school who, like 
you keep giving her Atkins bars. 
You put her on Carnivore and she 
just keeps getting fatter 
and you're just like, f this fat. 
I'm stuck with this fat stinky bitch. 
But, but it is the most useful 
coin in all of crypto. 
I'm going to stick to that. 
So really we can just come 
in here, guys, and I would just 
grab Sui, Avax, Cardano, 
Doge, Solana and maybe xrp. 
I like XRP here. 
I think if we want to get 
the best gains, let's look 
at the X's on all of these. 
I think Ethereum can 
easily 3 to 4x here. 
It could in a cool case, 5 
go all the way up to 10k right here. 
So that's the best case scenario. 
XRP right here will get, I think, 
slightly higher gains than that. 
It has a lot of potential 
to actually go up to the same market 
cap as east and then keep going. 
Bankers absolutely love this coin. 
So I think we could see 
very similar gains. 
Maybe 25%, 50% higher than 
Ethereum right here. 
Now, once we get down to 
bnb, Solana, Doge, Cardano. 
This is where we start 
seeing the 5, 6, 7 X's. 
I think the best coin out of all 
these I'd be comfortable holding. 
Binance is doing some 
silly shit right now. 
I think BNB is going to do 
really well, but the stuff I see 
Binance constantly doing 
makes me think that everyone 
there is going to go to prison. 
So I. 
I don't. 
I would just kind of skip bnb. 
There's a chance it does really great 
here, but, like, why take the risk? 
And if someone from Binance here 
is hiring assassins to come kill 
me right now for saying this. 
Just stop listing meme coins 
over legitimate projects 
and then dumping them as soon 
as they go on your exchange. 
It looks really. 
Look at these charts. 
This looks terrible. 
Stop doing this. 
It's not good for your brand. 
I really like Binance. 
I love Binance. 
Please don't have me killed. 
All right, so look where 
I'd be starting at would 
be Solana in this case. 
If I want the bigger gains now. 
I don't like Solana in this instance. 
Not because Solana is bad. 
It's just because it really had 
a massive bull run already. 
And so a lot of the gains 
have come there. 
It went from $12 to $100. 
We have not seen those gains yet 
in these other coins down here. 
I think the top performer right here. 
And this kills my soul to say it. 
My dick is shriveling inside my body 
as these words leave my mouth. 
I think Cardano is going to be 
the biggest gainer from here. 
No. 
God, please no. 
This thing is probably 
in a bull run going to four bucks. 
So we're looking at just ph. 
Insane gains on Cardano. 
I would just be stocking up right 
now because I think Cardano. 
I hate the holders. 
Like, if you're watching this right 
now and you're a Cardano holder, 
like, I actively dislike you. 
If you come and see me in public, 
I'm going to stab you with a knife. 
I'm always caring. 
And if you're. 
And if you're one of the few 
Cardano holders that's above 
4 foot 9, I'm probably going 
to shoot you because You're. 
You're a crazy person that has 
a little bit of weight behind you. 
I'm not. 
I'm not going to jujitsu rest. 
I'm just going to shoot you 
dead right there because I 
know you guys are some sick, 
sadistic motherfuckers. 
You've been living under your 
staircase like Harry Potter or 
some other dude bangs your wife 
for the last four years. 
Your mind is broken. 
You've been living off pizza crust 
and the leftovers of Lunchables that 
your kids, who no longer respect 
you, leave laying around the house. 
You're rabid. 
You're feral creatures. 
I fear you and I hate you. 
So please understand that. 
That being said, the technology 
behind Cardano is really great. 
And Charles Hosingson has been on 
Twitter and quoted insulting people 
because their father didn't pull out 
or wear a condom when their moms. 
And I think that's extremely bullish. 
I mean, honestly, that's 
probably the most bullish thing I 
could put up there. 
If you compare that against Vitalik's 
recent behavior, I mean, Charles is 
looking pretty cool at these points. 
So that right there, the 
combination that Cardano is 
extremely fast, really good 
tech, and very decentralized 
with the fact that Charles is 
insulting people's pullout 
skills on Twitter, I think is 
really good for the project. 
Now, if we come down 
Avax really good. 
I think all of gaming is going 
to be built on this. 
It's extremely good for 
that type of technology. 
I think gaming is one 
of the most bullish narratives. 
Avax Great Sui is like Solana, 
but with tons of hype. 
I don't know what the fuck it does, 
but people are all about this and I 
see similar amounts of hype to that. 
Dogecoin is just the meme 
coin, the international 
meme coin of crypto. 
I think it's going to do 
really good gains as well. 
I wouldn't. 
I'm not touching Dogecoin. 
Not because I don't think 
it's going to do well. 
I just think we're going 
to see similar gains in Cardano. 
I think we're going to see 
similar gains in Avax. 
And I feel a lot better about holding 
Cardano and Avax than I do Dogecoin. 
So this is where I'm 
going to stop at. 
If I want a big chunky like set 
and forget portfolio, the last place 
I'm going to stop is going 
to be RWA and AI coins right now. 
Now why RWA and AI coins? 
RWA coins are going to be the coins 
that are based around 
moving real world assets 
into on chain technology. 
So moving the stock market, 
moving houses over, moving 
cars over, moving everything 
we do on the chain. 
Okay. 
And so some really good 
top coins, I'm going to give 
you the smaller coins. 
They're going to do the crazy 
numbers here in a second. 
But if I'm just being really safe 
and conservative here, I'd go 
with alm, I'd go with Ondo. 
And if I wanted a big one that I 
think is going to run really far, 
are actually two that I think 
are going to run really well. 
I would go with Zig and Pin Link. 
Zig is like a layer or a chain 
that a lot of RWA is going to be on 
and Pin Link just released like 
a Dex or a uni swap of this. 
When these assets run, which they 
are, because this is what blackrock 
is really into, this is going 
to be the big sexy narrative. 
I promise you those coins are 
going to run now I'm going 
to give you the smaller ones. 
I think we're going to do the 10, 
20 crazy X's here in a sec. 
Now, if I'm getting into the next 
place, AI is going to change 
the world immensely here 
in the next two or three years. 
I work in tech and SaaS and that's. 
I actually build businesses there 
and I build a lot of SaaS companies 
and the stuff I'm seeing 
on AI is just, it's blowing me away. 
It's incredible what is going to 
happen the next two to three years. 
The hype around this though 
is going to be insane. 
This is going to make the dot com 
boom look like a Cardano holder's 
dick, which is small, it 
requires tweezers for stimulation. 
It's going to look very, it's going 
to look very minuscule is 
what I'm trying to say here. 
So with what I'm actually seeing 
in the real tech and the hype 
it's going to bring, this 
is going to transfer over 
to crypto incredibly well. 
I've already talked about in 
other videos how well AI and crypto 
tag team together and I think 
this is going to be maybe 
the most pumpiest, explosive one. 
So in the same process, rwa, where 
I would start at with these 
is I would get near protocol, 
Internet, computer and bit Tensor. 
That's going to do very, 
very, very well for you. 
There's a lot of other great AI 
coins, again, I'll give you the 
smaller ten 15x ones here in a 
second, but if I'm looking at 
like the big beginner portfolio 
that's what I'm doing right 
there. 
The kind of mid cap ones that I think 
are going to run and do very well. 
I would go with AOZ and Destra 
is going to do crazy numbers as 
soon as we rebound right here. 
The cool thing we've been seeing 
with AI coins is, yeah, they've 
been down with Ethereum, but the 
second the market reverses, they 
pumped super hard like 30, 50% 
every single time, showing people 
are just ready to pile into these 
things. 
And so those are kind of two 
of like the upper, more 
riskier picks I pick now. 
That's my overall view on the market. 
If you want those smaller, crazier, 
more pumpy coins, where the crazy 
gains going to be, I'm going 
to get that to you in a second. 
But first off, that's my 
overall view on the market. 
That's what I think is 
happening right here. 
We are just at a point 
right here where there's two 
things going to happen. 
One, this is the most oversold, 
ridiculous it's ever been 
and we are at the bottom or 
very near to the bottom. 
I do not see these prices we're 
at right now or in these buy points 
right here over the next six months 
to a year being bad prices. 
I don't care if we go 20% lower, 
I don't care if we go 10% lower. 
I don't know what's 
going to happen yet. 
But I would be blown away if in six 
months, a year from now, worst 
case scenario, two years from now. 
These are not some of the best 
buy prices you're going to see 
in the last decade of crypto. 
This looks like everything. 
If we look at the fear, the trauma, 
the overselling, what 
the big walls are doing, this all 
lines up with some of the biggest 
runs in crypto history. 
So that's why I'm just 
like, let's, let's do this. 
Let's be all in. 
And that's why I'm still 
holding everything I've talked 
about on this channel. 
That's why I've just 
turned my brain off. 
I'm saying, Jesus, 
take the wheel here. 
So that being said, the smaller, 
more pumpier, like crazy coins, 
you're gonna get the results in. 
There are two videos I've 
made on this channel. 
There's an RWA video that will 
be popping up right here. 
There's an AI video. 
We'll be p right here. 
This goes into all the smaller, 
really pumpy coins we 
can get the crazy gains at. 
This is advanced stuff. 
This is where all the crazy gains are 
going to be at that are very, very 
risky for you tier 10 degeners. 
Watch those videos. 
Each of these videos right here is 
another huge big topic on its own. 
You should understand the niches, 
you should understand 
the industries on their own. 
And we don't have time to include 
both of that in this video. 
So I've made these videos 
right here out Candy P. 
 `,
  });
console.log(
  ` Transcript: ${transcript} \n Usage: ${usage} \n Entities: ${JSON.stringify(
    entities
  )} \n Raw: ${JSON.stringify(default_content)}`
);

/* console.log(
  await getEntitiesNer({
    transcript: "I want to invest in Bitcoin and Ethereum",
  })
);
 */
