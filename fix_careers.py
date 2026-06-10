content = open('src/App.tsx', encoding='utf-8').read()

old_jobs = """// Job listings data
const jobListings = [
  { id: 1, title: 'Senior Embedded Engineer', location: 'Bangalore, India', type: 'Full-time', tag: 'Engineering' },
  { id: 2, title: 'Power Electronics Engineer', location: 'Bangalore, India', type: 'Full-time', tag: 'Engineering' },
  { id: 3, title: 'PCB Design Engineer', location: 'Bangalore, India', type: 'Full-time', tag: 'Hardware' },
  { id: 4, title: 'Firmware Developer', location: 'Bangalore, India', type: 'Full-time', tag: 'Software' },
  { id: 5, title: 'Test Engineer', location: 'Bangalore, India', type: 'Full-time', tag: 'Quality' },
  { id: 6, title: 'Technical Project Manager', location: 'Bangalore, India', type: 'Full-time', tag: 'Management' },
];"""

new_jobs = """// Job listings data
const jobListings = [
  { id: 1, title: 'Senior Embedded Engineer', location: 'Bangalore, India', type: 'Full-time', tag: 'Engineering', exp: '4+ years', desc: 'Design and develop embedded firmware for STM32 and ARM Cortex platforms.' },
  { id: 2, title: 'Power Electronics Engineer', location: 'Bangalore, India', type: 'Full-time', tag: 'Engineering', exp: '3+ years', desc: 'Design SMPS, DC-DC converters and power systems for industrial applications.' },
  { id: 3, title: 'PCB Design Engineer', location: 'Bangalore, India', type: 'Full-time', tag: 'Hardware', exp: '2+ years', desc: 'Multi-layer PCB design with signal integrity and EMI/EMC compliance.' },
  { id: 4, title: 'Firmware Developer', location: 'Bangalore, India', type: 'Full-time', tag: 'Software', exp: '2+ years', desc: 'Bare-metal and RTOS-based firmware development for embedded systems.' },
  { id: 5, title: 'Test Engineer', location: 'Bangalore, India', type: 'Full-time', tag: 'Quality', exp: '2+ years', desc: 'Develop and execute test plans for power electronics and embedded products.' },
  { id: 6, title: 'Technical Project Manager', location: 'Bangalore, India', type: 'Full-time', tag: 'Management', exp: '5+ years', desc: 'Lead cross-functional engineering teams to deliver products on time.' },
];"""

content = content.replace(old_jobs, new_jobs)

old_grid = """          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {jobListings.map((job) => (
              <div
                key={job.id}
                className="reveal bg-white rounded-xl border border-neutral-200 p-5 sm:p-6 hover:border-primary hover:shadow-md transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <h4 className="text-base sm:text-lg font-semibold text-neutral-900 mb-3">{job.title}</h4>
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className="flex items-center text-xs text-neutral-500">
                      <MapPin className="w-3 h-3 mr-1" />
                      {job.location}
                    </span>
                    <span className="text-xs text-neutral-500">{job.type}</span>
                    <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                      {job.tag}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => openModal(job.title)}
                  className="mt-2 w-full py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2 group-hover:gap-3"
                >
                  Apply Now <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>"""

new_grid = """          {/* Stats bar */}
          <div className="flex flex-wrap justify-center gap-6 sm:gap-12 mb-10 sm:mb-14">
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-primary">6</p>
              <p className="text-xs sm:text-sm text-neutral-500 mt-1">Open Positions</p>
            </div>
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-primary">Bangalore</p>
              <p className="text-xs sm:text-sm text-neutral-500 mt-1">Location</p>
            </div>
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-primary">Full-time</p>
              <p className="text-xs sm:text-sm text-neutral-500 mt-1">Employment Type</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {jobListings.map((job) => (
              <div
                key={job.id}
                className="reveal bg-white rounded-xl border border-neutral-200 p-5 sm:p-6 hover:border-primary hover:shadow-lg transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  {/* Tag + exp row */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold bg-primary/10 text-primary px-2.5 py-1 rounded-full">
                      {job.tag}
                    </span>
                    <span className="text-xs text-neutral-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />{job.exp}
                    </span>
                  </div>

                  {/* Title */}
                  <h4 className="text-base sm:text-lg font-bold text-neutral-900 mb-2 group-hover:text-primary transition-colors">{job.title}</h4>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-neutral-500 mb-4 leading-relaxed">{job.desc}</p>

                  {/* Meta */}
                  <div className="flex items-center gap-3 text-xs text-neutral-400 mb-5">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{job.location}</span>
                    <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" />{job.type}</span>
                  </div>
                </div>

                {/* Apply button */}
                <button
                  onClick={() => openModal(job.title)}
                  className="flex items-center justify-between w-full px-4 py-2.5 border border-neutral-200 rounded-lg text-sm font-medium text-neutral-700 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all group-hover:border-primary group-hover:text-primary"
                >
                  Apply for this role
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>"""

content = content.replace(old_grid, new_grid)

open('src/App.tsx', 'w', encoding='utf-8').write(content)
print('Done!')
