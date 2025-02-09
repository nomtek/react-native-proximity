require 'json'

package = JSON.parse(File.read(File.join(__dir__, 'package.json')))

Pod::Spec.new do |s|
  s.name           = package['name']
  s.version        = package['version']
  s.summary        = package['description']
  s.description    = package['description']
  s.license        = package['license']
  s.author         = package['author']
  s.homepage       = package['homepage']
  s.source         = { :git => package['repository']['url'], :tag => s.version}

  s.requires_arc   = true
  s.platform       = :ios, '10.0'
  
  s.source_files   = 'RNProximity/**/*.{h,m}'

  s.static_framework = true

  s.dependency 'React'
end
