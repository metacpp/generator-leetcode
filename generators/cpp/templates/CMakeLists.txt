########################################################################
# CMake build script for <%= projectName %>.

# Compiler settings for different platforms.
set(CMAKE_CXX_STANDARD 11) # C++11...


########################################################################
# Project-wide settings

# Name of project.
project(<%= projectName %> CXX C)
cmake_minimum_required(VERSION 3.0.0)

# Language "C" is required for find_package(Threads).
find_package(Threads REQUIRED)
if(CMAKE_COMPILER_IS_GNUCXX)
  add_definitions(-Wall -ansi -Wno-deprecated -pthread)
endif()

# Add googletest into the build system.
add_subdirectory(${PROJECT_SOURCE_DIR}/third_party)

# Where Google Test's .h files can be found.
include_directories(${gtest_INCLUDE_DIR})

# Where Google Test's libraries can be found.
link_directories(${gtest_LIBS_DIR})

# Where solution and unit test source files can be found.
file(
  GLOB PROJECT_SOURCE_FILES
    ${PROJECT_SOURCE_DIR}/src/**/*.cc
    ${PROJECT_SOURCE_DIR}/src/run_alltests.cc
)

add_executable(${PROJECT_NAME} ${PROJECT_SOURCE_FILES})
add_dependencies(${PROJECT_NAME} googletest)

# Where to link to Google Test's library files.
if(NOT (WIN32 OR MINGW))
  target_link_libraries(${PROJECT_NAME}
    ${gtest_LIBS_DIR}/libgtest.a
  )
else()
  target_link_libraries(${PROJECT_NAME}
    debug ${gtest_LIBS_DIR}/debug/${CMAKE_FIND_LIBRARY_PREFIXES}gtestd${CMAKE_FIND_LIBRARY_SUFFIXES}
    optimized ${gtest_LIBS_DIR}/release/${CMAKE_FIND_LIBRARY_PREFIXES}gtest${CMAKE_FIND_LIBRARY_SUFFIXES}
  )
endif()

# Where to link to thread library file.
target_link_libraries(${PROJECT_NAME} ${CMAKE_THREAD_LIBS_INIT})

########################################################################
# <%= projectName %>'s unit tests.
enable_testing()
add_test(<%= projectName %>test ${PROJECT_NAME})
