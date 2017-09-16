########################################################################
# CMake build script for external dependency on Google Test.

# Build options for different compilers.
set(GTEST_FORCE_SHARED_CRT ON)
set(GTEST_DISABLE_PTHREADS OFF)
if(MINGW)
  set(GTEST_DISABLE_PTHREADS ON)
endif()


########################################################################
# Project-wide settings
project(gtest-build CXX C)
cmake_minimum_required(VERSION 3.0.0)

# Import Google C++ Test as external project dependency.
include(ExternalProject)
ExternalProject_Add(googletest
  GIT_REPOSITORY https://github.com/google/googletest.git
  CMAKE_ARGS -DCMAKE_ARCHIVE_OUTPUT_DIRECTORY_DEBUG:PATH=debug
  -DCMAKE_ARCHIVE_OUTPUT_DIRECTORY_RELEASE:PATH=release
  -DCMAKE_CXX_FLAGS=${MSVC_COMPILER_DEFS}
  -Dgtest_force_shared_crt=${GTEST_FORCE_SHARED_CRT}
  -Dgtest_disable_pthreads=${GTEST_DISABLE_PTHREADS}
  -DBUILD_GTEST=ON
  -DBUILD_GMOCK=OFF
  PREFIX "${CMAKE_CURRENT_BINARY_DIR}"
  # Disable install step
  INSTALL_COMMAND ""
)

# Specify include directory for the parent project.
ExternalProject_Get_Property(googletest SOURCE_DIR)
set(gtest_INCLUDE_DIR ${SOURCE_DIR}/googletest/include PARENT_SCOPE)

# Specify library directory for the parent project.
ExternalProject_Get_Property(googletest BINARY_DIR)
set(gtest_LIBS_DIR ${BINARY_DIR}/googletest PARENT_SCOPE)
