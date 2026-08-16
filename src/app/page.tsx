"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionTrigger,
  Avatar,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Grid,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  Input,
  Label,
  List,
  ListItem,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Progress,
  Radio,
  RadioGroup,
  ScrollArea,
  ScrollAreaScrollbar,
  ScrollAreaViewport,
  Section,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  Slider,
  SliderControl,
  SliderIndicator,
  SliderThumb,
  SliderTrack,
  Stack,
  Stat,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  Timeline,
  TimelineItem,
  ToastProvider,
  Tooltip,
  useToast,
} from "../components/ui";

import {
  Check,
  Copy,
  Disc3,
  Heart,
  MoreHorizontal,
  Play,
  Search,
  Share2,
  Star,
} from "lucide-react";

type Album = {
  title: string;
  year: string;
  era: "2000s" | "2010s" | "2020s";
  image: string;
  description: string;
  tracks: string[];
};

const albums: Album[] = [
  {
    title: "The College Dropout",
    year: "2004",
    era: "2000s",
    image: "https://i.scdn.co/image/ab67616d0000b27325b055377757b3cdd6f26b78",
    description: "A soul-sampling debut that established Kanye as both a producer and an artist.",
    tracks: ["We Don't Care", "Through the Wire", "Jesus Walks"],
  },
  {
    title: "Late Registration",
    year: "2005",
    era: "2000s",
    image: "https://i.scdn.co/image/ab67616d0000b273428d2255141c2119409a31b2",
    description:
      "Orchestral arrangements and soul samples pushed the sound of the debut even further.",
    tracks: ["Heard 'Em Say", "Touch the Sky", "Gold Digger"],
  },
  {
    title: "Graduation",
    year: "2007",
    era: "2000s",
    image: "https://i.scdn.co/image/ab67616d0000b2739bbd79106e510d13a9a5ec33",
    description: "A stadium-sized record built around synths, electronic textures, and huge hooks.",
    tracks: ["Good Morning", "Stronger", "Flashing Lights"],
  },
  {
    title: "808s & Heartbreak",
    year: "2008",
    era: "2000s",
    image: "https://i.scdn.co/image/ab67616d0000b2736aef0beb5d4a74bcad0e337d",
    description:
      "A colder and more vulnerable record centered around Auto-Tune and 808 drum machines.",
    tracks: ["Say You Will", "Heartless", "Love Lockdown"],
  },
  {
    title: "My Beautiful Dark Twisted Fantasy",
    year: "2010",
    era: "2010s",
    image: "https://i.scdn.co/image/ab67616d00001e02d9194aa18fa4c9362b47464f",
    description:
      "Dense, maximalist production combining orchestration, sampling, rock, and hip-hop.",
    tracks: ["Dark Fantasy", "Power", "Runaway"],
  },
  {
    title: "Yeezus",
    year: "2013",
    era: "2010s",
    image: "https://i.scdn.co/image/ab67616d00001e021dacfbc31cc873d132958af9",
    description:
      "Industrial percussion, distorted synths, and minimalist arrangements created a harsh sonic world.",
    tracks: ["On Sight", "Black Skinhead", "Bound 2"],
  },
  {
    title: "The Life of Pablo",
    year: "2016",
    era: "2010s",
    image: "https://i.scdn.co/image/ab67616d00001e022a7db835b912dc5014bd37f4",
    description:
      "An intentionally unfinished-feeling album that evolved through post-release updates.",
    tracks: ["Ultralight Beam", "Famous", "Waves"],
  },
  {
    title: "Ye",
    year: "2018",
    era: "2010s",
    image: "https://i.scdn.co/image/ab67616d00001e020cd942c1a864afa4e92d04f2",
    description: "A short and intimate seven-track record recorded during the Wyoming sessions.",
    tracks: ["I Thought About Killing You", "Ghost Town", "Violent Crimes"],
  },
  {
    title: "Donda",
    year: "2021",
    era: "2020s",
    image:
      "https://upload.wikimedia.org/wikipedia/en/thumb/9/9b/Kanye_West_-_Donda_With_Child.png/250px-Kanye_West_-_Donda_With_Child.png?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail",
    description:
      "A sprawling album named after Kanye's mother and shaped around large-scale listening events.",
    tracks: ["Jail", "Hurricane", "Off the Grid"],
  },
];

const timeline = [
  {
    year: "2004",
    title: "The beginning",
    description: "The College Dropout introduces Kanye as a solo artist.",
  },
  {
    year: "2007",
    title: "Graduation",
    description: "Synth-heavy production pushes his music toward a stadium scale.",
  },
  {
    year: "2008",
    title: "A radical change",
    description: "808s & Heartbreak introduces a much more vulnerable sound.",
  },
  {
    year: "2010",
    title: "The maximalist era",
    description: "My Beautiful Dark Twisted Fantasy becomes a defining release.",
  },
  {
    year: "2013",
    title: "Yeezus",
    description: "Industrial textures completely reshape his production.",
  },
  {
    year: "2021",
    title: "Donda",
    description: "Large-scale listening events lead into the release of Donda.",
  },
];

const collaborators = ["Jay-Z", "Kid Cudi", "Pusha T", "Rihanna", "Ty Dolla $ign", "John Legend"];

export default function Home() {
  return (
    <ToastProvider>
      <ArchivePage />
    </ToastProvider>
  );
}

function ArchivePage() {
  const { toast } = useToast();

  const [era, setEra] = useState("All");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [liked, setLiked] = useState(false);
  const [volume, setVolume] = useState(70);
  const [favorite, setFavorite] = useState("My Beautiful Dark Twisted Fantasy");
  const [favoriteEra, setFavoriteEra] = useState("2010s");
  const [rememberPreferences, setRememberPreferences] = useState(false);
  const [note, setNote] = useState("");
  const [playing, setPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [savedAlbums, setSavedAlbums] = useState<string[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);

  const perPage = 6;

  const filteredAlbums = useMemo(() => {
    return albums.filter((album) => {
      const matchesEra = era === "All" || album.era === era;

      const query = search.toLowerCase().trim();

      const matchesSearch =
        !query ||
        album.title.toLowerCase().includes(query) ||
        album.description.toLowerCase().includes(query) ||
        album.tracks.some((track) => track.toLowerCase().includes(query));

      return matchesEra && matchesSearch;
    });
  }, [era, search]);

  const pageCount = Math.max(1, Math.ceil(filteredAlbums.length / perPage));

  const visibleAlbums = filteredAlbums.slice((page - 1) * perPage, page * perPage);

  const exploredCount = savedAlbums.length;
  const progress = Math.round((exploredCount / albums.length) * 100) || 0;

  function showToast(
    title: string,
    description: string,
    variant: "default" | "success" | "error" | "warning" = "default",
  ) {
    toast({
      title,
      description,
      variant,
    });
  }

  function toggleArtistSaved() {
    const next = !liked;

    setLiked(next);

    showToast(
      next ? "Artist saved" : "Artist removed",
      next
        ? "Kanye West was added to your saved artists."
        : "Kanye West was removed from your saved artists.",
      next ? "success" : "default",
    );
  }

  function playTrack(track = "Runaway") {
    setPlaying(true);

    showToast("Now playing", `${track} — Kanye West`, "success");
  }

  function toggleAlbumSaved(album: Album) {
    const exists = savedAlbums.includes(album.title);

    setSavedAlbums((current) =>
      exists ? current.filter((title) => title !== album.title) : [...current, album.title],
    );

    showToast(
      exists ? "Album removed" : "Album saved",
      exists
        ? `${album.title} was removed from your favorites.`
        : `${album.title} was added to your favorites.`,
      exists ? "default" : "success",
    );
  }

  async function copyText(text: string) {
    try {
      await navigator.clipboard.writeText(text);

      showToast("Copied", "The link was copied to your clipboard.", "success");
    } catch {
      showToast("Couldn't copy", "Your browser blocked clipboard access.", "error");
    }
  }

  function shareArtist() {
    if (typeof navigator !== "undefined" && "share" in navigator) {
      navigator
        .share({
          title: "Kanye West — Artist Archive",
          text: "Kanye West artist archive",
          url: window.location.href,
        })
        .then(() => {
          showToast("Shared", "The artist archive was shared.", "success");
        })
        .catch(() => undefined);

      return;
    }

    copyText(window.location.href);
  }

  function savePreferences() {
    showToast("Preferences saved", `${favorite} · ${favoriteEra} · ${volume}% volume`, "success");
  }

  function handleSearch(value: string) {
    setSearch(value);
    setPage(1);
  }

  function handleEra(value: string | null) {
    setEra(value ?? "All");
    setPage(1);
  }

  return (
    <div className="space-y-16">
      <section className="relative overflow-hidden border-b border-border pb-10">
        <div className="relative h-72 overflow-hidden border-y border-border">
          <Image
            src="https://lastfm-img.freetls.fastly.net/i/u/770x0/1e5f3c0acc7c92b384ccdfe7eac85cda.jpg#1e5f3c0acc7c92b384ccdfe7eac85cda"
            alt=""
            fill
            priority
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        </div>

        <div className="relative -mt-12 px-6">
          <Avatar
            src="https://lastfm-img.freetls.fastly.net/i/u/770x0/c975f3fe244f08978a709d349e68b329.jpg#c975f3fe244f08978a709d349e68b329"
            alt="Kanye West"
            fallback="kw"
            size={96}
          />
        </div>

        <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Badge variant="outline">Artist archive</Badge>

            <h1 className="mt-3 text-5xl tracking-tight">Kanye West</h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
              Explore the albums, eras, collaborators, and production experiments that shaped one of
              the most influential discographies in modern hip-hop.
            </p>
          </div>

          <div className="flex gap-2">
            <Button variant={liked ? "default" : "outline"} onClick={toggleArtistSaved}>
              <Heart className="size-4" />
              {liked ? "Saved" : "Save artist"}
            </Button>

            <Tooltip content="Play featured track">
              <Button size="icon" onClick={() => playTrack()} aria-label="Play featured track">
                {playing ? <span className="text-[10px]">II</span> : <Play className="size-4" />}
              </Button>
            </Tooltip>

            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button variant="ghost" size="icon" aria-label="More options">
                    <MoreHorizontal className="size-4" />
                  </Button>
                }
              />

              <DropdownMenuContent>
                <DropdownMenuItem onClick={shareArtist}>
                  <Share2 className="mr-2 size-4" />
                  Share artist
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => copyText(window.location.href)}>
                  <Copy className="mr-2 size-4" />
                  Copy link
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() =>
                    showToast("Archive exported", "Your archive data has been prepared.", "success")
                  }
                >
                  Export archive
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </section>

      {/* TABS */}

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>

          <TabsTrigger value="discography">Discography</TabsTrigger>

          <TabsTrigger value="timeline">Timeline</TabsTrigger>

          <TabsTrigger value="profile">My profile</TabsTrigger>
        </TabsList>

        {/* OVERVIEW TAB */}

        <TabsContent value="overview">
          <div className="mt-8 space-y-16">
            <Section title="Overview">
              <Grid className="md:grid-cols-4">
                <Stat label="Albums" value="9" change="2004 — 2021" />

                <Stat label="Tracks" value="100+" change="across the catalog" />

                <Stat label="Active years" value="17" change="and counting" />

                <Stat label="Favorite" value="11/10" change="personal rating" />
              </Grid>
            </Section>

            <Section title="Featured album">
              <Card className="overflow-hidden">
                <div className="grid md:grid-cols-[280px_1fr]">
                  <div className="relative aspect-square md:aspect-auto">
                    <Image
                      src="https://i.scdn.co/image/ab67616d00001e02d9194aa18fa4c9362b47464f"
                      alt="My Beautiful Dark Twisted Fantasy"
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex flex-col justify-between p-6">
                    <div>
                      <Badge variant="outline">2010 · 2010s</Badge>

                      <h2 className="mt-4 text-3xl">My Beautiful Dark Twisted Fantasy</h2>

                      <p className="mt-4 max-w-xl text-sm leading-6 text-muted">
                        Dense, maximalist production combining orchestration, sampling, rock, and
                        hip-hop.
                      </p>

                      <List className="mt-6">
                        {albums[4].tracks.map((track) => (
                          <ListItem key={track}>{track}</ListItem>
                        ))}
                      </List>
                    </div>

                    <div className="mt-8 flex gap-2">
                      <Button onClick={() => playTrack("Runaway")}>
                        <Play className="size-4" />
                        Play album
                      </Button>

                      <Button variant="outline" onClick={() => toggleAlbumSaved(albums[4])}>
                        <Heart className="size-4" />
                        {savedAlbums.includes(albums[4].title) ? "Saved" : "Save"}
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </Section>

            <Section title="Collaborators">
              <Grid className="md:grid-cols-3">
                {collaborators.map((name) => (
                  <Card key={name}>
                    <CardHeader>
                      <CardTitle>{name}</CardTitle>
                      <CardDescription>Frequent collaborator</CardDescription>
                    </CardHeader>

                    <CardFooter>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          showToast("Collaborator selected", `${name} is now being explored.`)
                        }
                      >
                        Explore
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </Grid>
            </Section>
          </div>
        </TabsContent>

        {/* DISCOGRAPHY TAB */}

        <TabsContent value="discography">
          <div id="discography" className="mt-8 scroll-mt-8">
            <Section title="Discography">
              {/* Search + filter */}
              <div className="flex flex-col gap-4 md:flex-row">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />

                  <Input
                    value={search}
                    onChange={(event) => handleSearch(event.target.value)}
                    placeholder="Search albums or tracks..."
                    className="pl-9"
                  />
                </div>

                <Select value={era} onValueChange={handleEra}>
                  <SelectTrigger className="md:w-40">
                    <SelectValue placeholder="Era" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="All">All eras</SelectItem>
                    <SelectItem value="2000s">2000s</SelectItem>
                    <SelectItem value="2010s">2010s</SelectItem>
                    <SelectItem value="2020s">2020s</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Result count */}
              <div className="mt-4 flex items-center justify-between text-xs text-muted">
                <span>
                  {filteredAlbums.length} album
                  {filteredAlbums.length === 1 ? "" : "s"} found
                </span>

                {search && (
                  <Button variant="ghost" size="sm" onClick={() => handleSearch("")}>
                    Clear search
                  </Button>
                )}
              </div>

              {/* Albums */}
              {visibleAlbums.length === 0 ? (
                <Card className="mt-6">
                  <CardContent className="py-16 text-center">
                    <Disc3 className="mx-auto size-8 text-muted" />

                    <h3 className="mt-4 text-lg">No albums found</h3>

                    <p className="mt-2 text-sm text-muted">
                      Try another search or remove the current filter.
                    </p>

                    <Button
                      className="mt-6"
                      variant="outline"
                      onClick={() => {
                        setSearch("");
                        setEra("All");
                        setPage(1);
                      }}
                    >
                      Reset filters
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Grid className="mt-6 items-stretch md:grid-cols-3">
                  {visibleAlbums.map((album) => {
                    const isSaved = savedAlbums.includes(album.title);

                    return (
                      <ContextMenu key={album.title}>
                        <ContextMenuTrigger>
                          <Card className="flex h-full flex-col overflow-hidden">
                            {/* Album artwork */}
                            <div className="relative aspect-square shrink-0">
                              <Image
                                src={album.image}
                                alt={album.title}
                                fill
                                className="object-cover"
                              />

                              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-16">
                                <Badge variant="outline">{album.year}</Badge>
                              </div>

                              {isSaved && (
                                <div className="absolute right-3 top-3 flex size-8 items-center justify-center border border-white/20 bg-black/50 text-white">
                                  <Check className="size-4" aria-hidden="true" />
                                </div>
                              )}
                            </div>

                            {/* Header */}
                            <CardHeader className="min-h-[132px]">
                              <CardTitle>{album.title}</CardTitle>

                              <CardDescription>{album.description}</CardDescription>
                            </CardHeader>

                            {/* Tracks */}
                            <CardContent className="flex-1">
                              <List>
                                {album.tracks.map((track) => (
                                  <ListItem key={track}>
                                    <button
                                      type="button"
                                      className="text-left transition-colors hover:text-foreground hover:underline"
                                      onClick={() => playTrack(track)}
                                    >
                                      {track}
                                    </button>
                                  </ListItem>
                                ))}
                              </List>
                            </CardContent>

                            {/* Footer */}
                            <CardFooter className="mt-auto justify-between">
                              <Dialog>
                                <DialogTrigger
                                  render={
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => setSelectedAlbum(album)}
                                    >
                                      View album
                                    </Button>
                                  }
                                />

                                <DialogContent>
                                  <DialogTitle>{album.title}</DialogTitle>

                                  <DialogDescription className="mt-2">
                                    {album.description}
                                  </DialogDescription>

                                  {/* Artwork */}
                                  <div className="mt-6 overflow-hidden">
                                    <Image
                                      src={album.image}
                                      alt={album.title}
                                      width={600}
                                      height={600}
                                      className="aspect-square w-full object-cover"
                                    />
                                  </div>

                                  {/* Tracks */}
                                  <div className="mt-6">
                                    <Label>Featured tracks</Label>

                                    <ScrollArea className="mt-2 h-32 border border-border">
                                      <ScrollAreaViewport className="p-3">
                                        {album.tracks.map((track) => (
                                          <button
                                            type="button"
                                            key={track}
                                            onClick={() => playTrack(track)}
                                            className="block w-full py-1 text-left text-sm text-muted transition-colors hover:text-foreground"
                                          >
                                            {track}
                                          </button>
                                        ))}
                                      </ScrollAreaViewport>

                                      <ScrollAreaScrollbar />
                                    </ScrollArea>
                                  </div>

                                  {/* Actions */}
                                  <div className="mt-4 flex gap-2">
                                    <Button onClick={() => playTrack(album.tracks[0])}>
                                      <Play className="size-4" />
                                      Play
                                    </Button>

                                    <Button
                                      variant="outline"
                                      onClick={() => toggleAlbumSaved(album)}
                                    >
                                      <Heart className="size-4" />

                                      {isSaved ? "Saved" : "Save"}
                                    </Button>
                                  </div>
                                </DialogContent>
                              </Dialog>

                              <HoverCard>
                                <HoverCardTrigger
                                  render={<Badge variant="outline">{album.era}</Badge>}
                                />

                                <HoverCardContent>
                                  Released during Kanye's {album.era} era.
                                </HoverCardContent>
                              </HoverCard>
                            </CardFooter>
                          </Card>
                        </ContextMenuTrigger>

                        {/* Context menu */}
                        <ContextMenuContent>
                          <ContextMenuItem onClick={() => playTrack(album.tracks[0])}>
                            <Play className="mr-2 size-4" />
                            Play album
                          </ContextMenuItem>

                          <ContextMenuItem onClick={() => toggleAlbumSaved(album)}>
                            <Heart className="mr-2 size-4" />

                            {isSaved ? "Remove from favorites" : "Add to favorites"}
                          </ContextMenuItem>

                          <ContextMenuItem
                            onClick={() =>
                              copyText(
                                `${window.location.origin}/#${encodeURIComponent(album.title)}`,
                              )
                            }
                          >
                            <Copy className="mr-2 size-4" />
                            Copy album link
                          </ContextMenuItem>
                        </ContextMenuContent>
                      </ContextMenu>
                    );
                  })}
                </Grid>
              )}

              {/* Pagination */}
              {pageCount > 1 && (
                <Pagination className="mt-6">
                  <PaginationContent>
                    {Array.from({ length: pageCount }, (_, index) => index + 1).map((number) => (
                      <PaginationItem key={number}>
                        <PaginationLink
                          active={page === number}
                          onClick={() => {
                            setPage(number);

                            requestAnimationFrame(() => {
                              document.getElementById("discography")?.scrollIntoView({
                                behavior: "smooth",
                                block: "start",
                              });
                            });
                          }}
                        >
                          {number}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                  </PaginationContent>
                </Pagination>
              )}
            </Section>
          </div>
        </TabsContent>

        {/* TIMELINE TAB */}

        <TabsContent value="timeline">
          <div className="mt-8 space-y-16">
            <Section title="Career timeline">
              <Timeline>
                {timeline.map((item) => (
                  <TimelineItem key={item.year}>
                    <div className="flex gap-4">
                      <Badge variant="outline">{item.year}</Badge>

                      <div>
                        <h3 className="text-sm font-medium">{item.title}</h3>

                        <p className="mt-1 text-sm text-muted">{item.description}</p>
                      </div>
                    </div>
                  </TimelineItem>
                ))}
              </Timeline>
            </Section>

            <Section title="Listening progress">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Catalog completion</CardTitle>

                      <CardDescription>
                        Your saved albums are used to track your progress.
                      </CardDescription>
                    </div>

                    <Star className="size-5" />
                  </div>
                </CardHeader>

                <CardContent>
                  <Progress value={progress} />

                  <div className="mt-3 flex justify-between text-xs text-muted">
                    <span>
                      {exploredCount} of {albums.length} albums saved
                    </span>

                    <span>{progress}%</span>
                  </div>
                </CardContent>
              </Card>
            </Section>

            <Section title="Archive notes">
              <Accordion>
                <AccordionItem value="methodology">
                  <AccordionHeader>
                    <AccordionTrigger>How this archive works</AccordionTrigger>
                  </AccordionHeader>

                  <AccordionContent>
                    The archive groups albums by release era and provides search, filtering,
                    pagination, album dialogs, favorites, contextual menus, and playback
                    interactions.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="production">
                  <AccordionHeader>
                    <AccordionTrigger>Production eras</AccordionTrigger>
                  </AccordionHeader>

                  <AccordionContent>
                    The discography moves through several distinct production styles, from soul
                    sampling and orchestration to electronic, industrial, and gospel influences.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="data">
                  <AccordionHeader>
                    <AccordionTrigger>About the data</AccordionTrigger>
                  </AccordionHeader>

                  <AccordionContent>
                    Album information is bundled into this demonstration page. A production
                    implementation could replace the static data with MusicBrainz, Spotify, Last.fm,
                    or another music API.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Section>
          </div>
        </TabsContent>

        {/* PROFILE TAB */}

        <TabsContent value="profile">
          <div className="mt-8 space-y-16">
            <Section title="Your listening profile">
              <Card>
                <CardHeader>
                  <CardTitle>Personalize the archive</CardTitle>

                  <CardDescription>
                    Choose your favorite album and adjust your listening preferences.
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-8">
                  <div>
                    <Label>Favorite album</Label>

                    <Select
                      value={favorite}
                      onValueChange={(value) => {
                        if (value) {
                          setFavorite(value);

                          showToast(
                            "Favorite updated",
                            `${value} is now your favorite album.`,
                            "success",
                          );
                        }
                      }}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>

                      <SelectContent>
                        {albums.map((album) => (
                          <SelectItem key={album.title} value={album.title}>
                            {album.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Favorite era</Label>

                    <RadioGroup
                      value={favoriteEra}
                      onValueChange={(value) => {
                        if (value) {
                          setFavoriteEra(value);
                        }
                      }}
                      className="mt-3 flex flex-wrap gap-5"
                    >
                      {["2000s", "2010s", "2020s"].map((value) => (
                        <label key={value} className="flex items-center gap-2 text-sm">
                          <Radio value={value} />
                          {value}
                        </label>
                      ))}
                    </RadioGroup>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <Label>Playback volume</Label>

                      <span className="text-xs text-muted">{volume}%</span>
                    </div>

                    <Slider
                      value={volume}
                      onValueChange={(value) => {
                        if (value !== null) {
                          setVolume(value);
                        }
                      }}
                      className="mt-4"
                    >
                      <SliderControl>
                        <SliderTrack>
                          <SliderIndicator />
                        </SliderTrack>

                        <SliderThumb />
                      </SliderControl>
                    </Slider>
                  </div>

                  <label className="flex cursor-pointer items-center gap-3">
                    <Checkbox
                      checked={rememberPreferences}
                      onCheckedChange={(checked) => setRememberPreferences(Boolean(checked))}
                    />

                    <span className="text-sm">Remember my listening preferences</span>
                  </label>

                  <div>
                    <Label>Personal note</Label>

                    <Textarea
                      value={note}
                      onChange={(event) => setNote(event.target.value)}
                      placeholder="Write a note about this artist..."
                      className="mt-2"
                    />

                    <p className="mt-2 text-xs text-muted">{note.length}/500 characters</p>
                  </div>

                  <Button onClick={savePreferences}>Save preferences</Button>
                </CardContent>
              </Card>
            </Section>

            <Section title="Saved albums">
              {savedAlbums.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Heart className="mx-auto size-7 text-muted" />

                    <h3 className="mt-4 text-lg">Nothing saved yet</h3>

                    <p className="mt-2 text-sm text-muted">
                      Save albums from the discography to see them here.
                    </p>

                    <Button
                      className="mt-5"
                      variant="outline"
                      onClick={() => setActiveTab("discography")}
                    >
                      Browse discography
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Grid className="md:grid-cols-3">
                  {albums
                    .filter((album) => savedAlbums.includes(album.title))
                    .map((album) => (
                      <Card key={album.title}>
                        <CardHeader>
                          <CardTitle>{album.title}</CardTitle>

                          <CardDescription>{album.year}</CardDescription>
                        </CardHeader>

                        <CardFooter>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toggleAlbumSaved(album)}
                          >
                            Remove
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                </Grid>
              )}
            </Section>
          </div>
        </TabsContent>
      </Tabs>

      {/* FOOTER */}

      <Separator />

      <Stack gap="gap-1" className="py-8">
        <footer className="text-[10px] uppercase tracking-[0.2em] text-muted">
          nUIde · artist archive
        </footer>

        <p className="text-[10px] uppercase tracking-[0.15em] text-muted">
          A functional demonstration of the component library
        </p>
      </Stack>
    </div>
  );
}
