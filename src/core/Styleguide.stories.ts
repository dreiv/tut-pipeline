import type { Meta, StoryObj } from '@storybook/vue3'

const meta: Meta = {
  title: 'System/Styleguide',
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta

export const Default: StoryObj = {
  render: () => ({
    template: `
      <div class="min-h-screen p-12 md:p-24 space-y-40 animate-fade">

        <!-- 1. BRAND HERO (Uses: --text-h, --accent, --animate-fade) -->
        <section class="max-w-6xl mx-auto border-l-4 border-accent pl-12 py-4">
          <p class="text-accent font-mono text-sm tracking-[0.4em] uppercase mb-4">Design System v4.0</p>
          <h1 class="text-text-h text-7xl md:text-9xl font-black italic tracking-tighter">
            POKÉ<span class="text-accent">LAB</span>
          </h1>
          <p class="text-text text-2xl mt-6 max-w-3xl leading-relaxed">
            A comprehensive stress test of the <code class="text-accent">@theme</code> tokens,
            interactive component classes, and <code>light-dark()</code> color scheme.
          </p>
        </section>

        <!-- 2. TYPOGRAPHY & TEXT COLORS (Uses: --text, --text-h) -->
        <section class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div class="space-y-8">
            <h2 class="text-text-h text-3xl font-bold">Typography Scale</h2>
            <div class="space-y-4">
              <h1 class="text-text-h text-5xl font-extrabold tracking-tight">Display One</h1>
              <h2 class="text-text-h text-4xl font-bold">Display Two</h2>
              <h3 class="text-text-h text-3xl font-semibold">Display Three</h3>
              <p class="text-text text-lg">
                Standard body text using <code>--text</code>. It is designed to be readable and
                soft on the eyes, adapting to <strong>light and dark modes</strong> effortlessly.
              </p>
              <p class="text-text/60 text-sm italic">Secondary text or captions using 60% opacity.</p>
            </div>
          </div>

          <div class="p-10 rounded-[3rem] bg-accent-bg border border-accent-border">
            <h3 class="text-accent font-bold mb-4 italic">The dot-pattern background:</h3>
            <p class="text-text text-sm leading-loose">
              The radial gradient background is currently using <code>--dot-color</code>.
              You should see small 1px dots every 24px. This provides texture without
              cluttering the UI.
            </p>
          </div>
        </section>

        <!-- 3. BUTTONS & ACTIONS (Uses: .glass-button, .card-action-btn) -->
        <section class="max-w-6xl mx-auto space-y-12">
          <div class="flex items-center gap-4">
            <h2 class="text-text-h text-3xl font-bold">Interactive Elements</h2>
            <div class="h-px flex-1 bg-border"></div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
            <!-- Glass Buttons -->
            <div class="space-y-6">
              <h4 class="text-text/40 uppercase text-xs font-black tracking-widest">Glassmorphism</h4>
              <div class="flex flex-wrap gap-4">
                <button class="glass-button h-16 w-16 text-2xl">🔥</button>
                <button class="glass-button px-8 py-4 font-black text-text-h uppercase tracking-tighter">Enter Lab</button>
              </div>
            </div>

            <!-- Card Actions -->
            <div class="space-y-6">
              <h4 class="text-text/40 uppercase text-xs font-black tracking-widest">Card Controls</h4>
              <div class="group h-32 rounded-3xl border border-border bg-bg/50 p-6 flex items-center justify-center gap-4 hover:border-accent transition-all">
                <button class="card-action-btn card-action-btn-active p-3 rounded-xl border">★</button>
                <button class="card-action-btn p-3 rounded-xl border">✎</button>
                <button class="card-action-btn p-3 rounded-xl border">🗑</button>
              </div>
            </div>

            <!-- Nav Items -->
            <div class="space-y-6">
              <h4 class="text-text/40 uppercase text-xs font-black tracking-widest">Navigation Items</h4>
              <nav class="flex flex-col gap-2">
                <div class="nav-item router-link-active cursor-pointer">
                   <span class="w-2 h-2 rounded-full bg-accent"></span> Active View
                </div>
                <div class="nav-item cursor-pointer">
                   <span class="w-2 h-2 rounded-full bg-text/20"></span> Default View
                </div>
              </nav>
            </div>
          </div>
        </section>

        <!-- 4. DATA & LISTS (Uses: --border, --accent-bg) -->
        <section class="max-w-6xl mx-auto">
          <h2 class="text-text-h text-3xl font-bold mb-12">Lists & Tables</h2>
          <div class="overflow-hidden rounded-[2rem] border border-border bg-bg/50 backdrop-blur-md">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="border-b border-border bg-accent-bg">
                  <th class="p-6 text-text-h font-bold">Pokémon</th>
                  <th class="p-6 text-text-h font-bold">Type</th>
                  <th class="p-6 text-text-h font-bold">Ability</th>
                  <th class="p-6 text-text-h font-bold">Status</th>
                </tr>
              </thead>
              <tbody class="text-text">
                <tr class="border-b border-border/50 hover:bg-white/5 transition-colors">
                  <td class="p-6 font-bold text-text-h">Charizard</td>
                  <td class="p-6">Fire / Flying</td>
                  <td class="p-6 font-mono text-sm">Blaze</td>
                  <td class="p-6"><span class="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold border border-accent/20">Active</span></td>
                </tr>
                <tr class="border-b border-border/50 hover:bg-white/5 transition-colors">
                  <td class="p-6 font-bold text-text-h">Blastoise</td>
                  <td class="p-6">Water</td>
                  <td class="p-6 font-mono text-sm">Torrent</td>
                  <td class="p-6"><span class="px-3 py-1 rounded-full bg-text/5 text-text/40 text-xs font-bold border border-border">Benched</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- 5. FORM ELEMENTS (Testing inputs with variables) -->
        <section class="max-w-6xl mx-auto pb-40">
           <h2 class="text-text-h text-3xl font-bold mb-12">Form Stress Test</h2>
           <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
             <div class="space-y-4">
               <label class="text-text-h font-bold text-sm block">Search Pokémon</label>
               <input type="text" placeholder="Pikachu..."
                 class="w-full p-4 rounded-2xl border border-border bg-bg focus:border-accent focus:ring-4 focus:ring-accent/10 outline-none transition-all text-text-h" />
             </div>
             <div class="space-y-4">
               <label class="text-text-h font-bold text-sm block">Selection</label>
               <div class="flex gap-4">
                 <div class="flex-1 p-4 rounded-2xl border-2 border-accent bg-accent-bg text-accent font-bold text-center cursor-pointer">Selected</div>
                 <div class="flex-1 p-4 rounded-2xl border border-border bg-bg text-text/40 text-center cursor-pointer hover:border-text/20">Unselected</div>
               </div>
             </div>
           </div>
        </section>

      </div>
    `,
  }),
}
